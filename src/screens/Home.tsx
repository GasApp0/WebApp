import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CaretRight,
  ClockCounterClockwise,
  Clock,
  Gear,
  House,
  Info,
  List,
  MagnifyingGlass,
  MapPin,
  NavigationArrow,
  PencilSimple,
  Phone,
  SignIn,
  UserPlus,
  X,
} from '@phosphor-icons/react';
import MapView, { DEFAULT_LAT, DEFAULT_LNG } from '../components/MapView';

const CYLINDERS = [
  { id: 'small-a', name: 'Small Size', price: 3, img: '/small.png' },
  { id: 'small-b', name: 'Small Size', price: 5, img: '/small.png' },
  { id: 'large', name: 'Large Size', price: 10, img: '/medium.png' },
];

const PICKUP_TIMES = ['Now', 'In 30 mins', 'In 1 hour'];

const LOCATION_SUGGESTIONS = [
  'Ahodwo, Kumasi',
  'Adum, Kumasi',
  'East Legon, Accra',
  'Haatso, Accra',
  'Tamale Central',
  'Takoradi Market Circle',
];

const PRIMARY = '#0088FF';
const PRIMARY_TINT = 'rgba(0,136,255,0.10)';

function SidebarIcon({
  children,
  active = false,
  onClick,
  label,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          padding: 2,
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: active ? PRIMARY_TINT : '#FAFAFA',
        }}
      >
        {children}
      </div>
      {label && (
        <p
          style={{
            fontSize: 10,
            fontWeight: active ? 500 : 400,
            color: active ? PRIMARY : 'rgba(0,0,0,0.5)',
          }}
        >
          {label}
        </p>
      )}
    </div>
  );
}

function DrawerNavItem({
  children,
  active = false,
  accent = false,
  onClick,
  label,
}: {
  children: React.ReactNode;
  active?: boolean;
  accent?: boolean;
  onClick?: () => void;
  label: string;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 10px',
        borderRadius: 10,
        cursor: 'pointer',
        backgroundColor: active ? PRIMARY_TINT : 'transparent',
      }}
    >
      {children}
      <p
        style={{
          fontSize: 14,
          fontWeight: active || accent ? 600 : 400,
          color: active || accent ? PRIMARY : 'black',
        }}
      >
        {label}
      </p>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState('');

  const [locationText, setLocationText] = useState('Ashaade Quaye Street');
  const [locationSearchOpen, setLocationSearchOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');
  const [recentSearches] = useState<string[]>(['Qua Street']);
  const [destination, setDestination] = useState({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
  const [stationDistanceKm, setStationDistanceKm] = useState<number | null>(null);

  const [pickupTime, setPickupTime] = useState('Now');
  const [editingTime, setEditingTime] = useState(false);
  const [scheduleView, setScheduleView] = useState(false);
  const [pickupMode, setPickupMode] = useState<'instantly' | 'tomorrow' | 'custom'>('instantly');
  const [customDate, setCustomDate] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Draggable bottom sheet (mobile), 3 snap points:
  //   0 = minimal   (title + location only)
  //   1 = mid       (+ cylinder size) — default
  //   2 = expanded  (+ rider instructions)
  // Dragging past the top of 2 opens the location search flow. No internal
  // scrolling — the sheet's clipped height is what changes, not an overflow region.
  const SHEET_MID_HEIGHT = 420;
  const SHEET_OVERDRAG_TO_SEARCH = 70;
  const [sheetSnap, setSheetSnap] = useState<0 | 1 | 2>(1);
  const [sheetMinHeight, setSheetMinHeight] = useState<number | null>(null);
  const [sheetMaxHeightMeasured, setSheetMaxHeightMeasured] = useState<number | null>(null);
  const [sheetDragDelta, setSheetDragDelta] = useState(0);
  const [sheetDragging, setSheetDragging] = useState(false);
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const sheetTitleCardRef = useRef<HTMLDivElement>(null);
  const sheetDragStartY = useRef(0);
  const sheetDragStartHeight = useRef(SHEET_MID_HEIGHT);

  const [selectedCylinder, setSelectedCylinder] = useState(CYLINDERS[0].id);
  const [riderInstructions, setRiderInstructions] = useState('');

  const [authStep, setAuthStep] = useState<'none' | 'google' | 'contact'>('none');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    if (userData?.data) {
      const hasOrders = userData.orders?.length > 0;
      if (hasOrders) {
        navigate('/Tracker');
        return;
      }

      const firstName = userData.data.firstName || '';
      const lastName = userData.data.lastName || '';
      setUserInitials(`${firstName[0] || ''}${lastName[0] || userData.data.email?.[0] || 'U'}`.toUpperCase());
      setLoggedIn(true);
    }
  }, [navigate]);

  // Base price per cylinder size, adjusted by distance from the nearest filling
  // station to the delivery pin — a rider further from a station costs more to
  // dispatch. Unadjusted until a distance is actually known (e.g. geolocation
  // denied), so the sticker prices don't shift around unexpectedly.
  const RATE_PER_KM = 0.5;
  const priceFor = (basePrice: number) =>
    stationDistanceKm != null ? +(basePrice + stationDistanceKm * RATE_PER_KM).toFixed(2) : basePrice;

  const placeOrder = () => {
    const cylinder = CYLINDERS.find((c) => c.id === selectedCylinder)!;
    navigate('/Amount', {
      state: {
        size: cylinder.name,
        price: priceFor(cylinder.price),
        hostel: locationText,
        riderInstructions,
        coordinates: destination,
        stationDistanceKm,
      },
    });
  };

  useEffect(() => {
    const measure = () => {
      if (sheetContentRef.current) setSheetMaxHeightMeasured(sheetContentRef.current.scrollHeight);
      if (sheetTitleCardRef.current) setSheetMinHeight(sheetTitleCardRef.current.scrollHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const sheetMinH = sheetMinHeight ?? 170;
  const sheetMaxH = sheetMaxHeightMeasured ?? SHEET_MID_HEIGHT;
  const SHEET_HEIGHTS = [sheetMinH, SHEET_MID_HEIGHT, sheetMaxH] as const;

  const handleSheetDragStart = (clientY: number) => {
    sheetDragStartY.current = clientY;
    sheetDragStartHeight.current = SHEET_HEIGHTS[sheetSnap];
    setSheetDragging(true);
  };

  const handleSheetDragMove = (clientY: number) => {
    setSheetDragDelta(sheetDragStartY.current - clientY);
  };

  const handleSheetDragEnd = () => {
    setSheetDragging(false);
    const rawTarget = sheetDragStartHeight.current + sheetDragDelta;

    if (rawTarget > sheetMaxH + SHEET_OVERDRAG_TO_SEARCH) {
      setSheetSnap(2);
      setSheetDragDelta(0);
      setLocationQuery('');
      setLocationSearchOpen(true);
      return;
    }

    const clamped = Math.max(sheetMinH, Math.min(sheetMaxH, rawTarget));
    const nearest = SHEET_HEIGHTS.reduce(
      (best, h, i) => (Math.abs(h - clamped) < Math.abs(SHEET_HEIGHTS[best] - clamped) ? i : best),
      0,
    );
    setSheetSnap(nearest as 0 | 1 | 2);
    setSheetDragDelta(0);
  };

  const sheetHeight = sheetDragging
    ? Math.max(sheetMinH, sheetDragStartHeight.current + sheetDragDelta)
    : SHEET_HEIGHTS[sheetSnap];

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      setDestination({ lat: position.coords.latitude, lng: position.coords.longitude });
      setLocationText('Your Current Location');
      setLocationSearchOpen(false);
    });
  };

  const handleSelectLocation = (value: string) => {
    setLocationText(value);
    setLocationSearchOpen(false);
  };

  const handleSaveSchedule = () => {
    const label =
      pickupMode === 'instantly'
        ? 'Now'
        : pickupMode === 'tomorrow'
        ? 'Tomorrow'
        : customDate
        ? new Date(customDate + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
        : 'Pick Date';
    setPickupTime(label);
    setScheduleView(false);
  };

  const handleMainButtonClick = () => {
    if (!loggedIn) {
      setAuthStep('google');
      return;
    }
    placeOrder();
  };

  // Backend disabled: mock Google sign-in, then collect contact details locally.
  const handleContinueWithGoogle = () => {
    setAuthStep('contact');
  };

  const handleCompleteProfile = () => {
    if (!phone.trim() || !email.trim()) {
      alert('Please enter your phone number and email.');
      return;
    }

    const userData = {
      data: {
        firstName: '',
        lastName: '',
        phoneNumber: phone,
        email,
        hostelName: locationText,
      },
      orders: [],
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    setUserInitials(email[0]?.toUpperCase() || 'U');
    setLoggedIn(true);
    setAuthStep('none');
    placeOrder();
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar (desktop only) */}
      {!isMobile && (
      <div
        style={{
          width: 80,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          height: '100%',
        }}
      >
        {/* Brand / settings header */}
        <div
          style={{
            width: '100%',
            paddingInline: 10,
            paddingBlock: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          <div
            onClick={loggedIn ? () => alert('Settings clicked') : undefined}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: '#FAFAFA',
              boxShadow: '0px 1px 4px rgba(12,12,13,0.05), 0px 1px 4px rgba(12,12,13,0.10)',
              outline: '1px solid white',
              outlineOffset: -1,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: loggedIn ? 'pointer' : 'default',
            }}
          >
            <img className="logo-swing" src="/logo.svg" alt="GasApp" style={{ width: 16, height: 'auto' }} />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBlock: 24,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <SidebarIcon active label="Home" onClick={() => navigate('/home')}>
              <House size={18} weight="bold" color={PRIMARY} />
            </SidebarIcon>

            <SidebarIcon label="Orders" onClick={() => alert('Orders history coming soon')}>
              <ClockCounterClockwise size={18} weight="bold" color="rgba(0,0,0,0.6)" />
            </SidebarIcon>

            <SidebarIcon label="Notifications" onClick={() => alert('No new notifications')}>
              <Bell size={18} weight="bold" color="rgba(0,0,0,0.6)" />
            </SidebarIcon>

            {!loggedIn && (
              <SidebarIcon label="Contact Us" onClick={() => alert('Call Us: +233 000 000 000')}>
                <Phone size={18} weight="bold" color="rgba(0,0,0,0.6)" />
              </SidebarIcon>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            {loggedIn ? (
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: PRIMARY,
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {userInitials || 'U'}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 19 }}>
                <div
                  onClick={() => setAuthStep('google')}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                >
                  <UserPlus size={20} weight="bold" color={PRIMARY} />
                  <p style={{ fontSize: 13, fontWeight: 500, color: PRIMARY }}>Sign Up</p>
                </div>
                <div
                  onClick={() => setAuthStep('google')}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                >
                  <SignIn size={20} weight="bold" color="rgba(0,0,0,0.6)" />
                  <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.6)' }}>Log In</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Map + order card */}
      <div style={{ position: 'relative', flex: 1, height: '100%', overflow: 'hidden' }}>
        <MapView
          lat={destination.lat}
          lng={destination.lng}
          onLocationChange={(lat, lng) => setDestination({ lat, lng })}
          onNearestStationDistanceChange={setStationDistanceKm}
        />

        {/* Mobile hamburger + drawer */}
        {isMobile && (
          <>
            <div
              onClick={() => setMenuOpen(true)}
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1000,
              }}
            >
              <List size={20} weight="bold" color="black" />
            </div>

            {menuOpen && (
              <>
                <div
                  onClick={() => setMenuOpen(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 2900 }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 60,
                    left: 16,
                    width: 190,
                    backgroundColor: 'white',
                    borderRadius: 16,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                    padding: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    zIndex: 3000,
                  }}
                >
                  <DrawerNavItem active label="Home" onClick={() => { setMenuOpen(false); navigate('/home'); }}>
                    <House size={18} weight="bold" color={PRIMARY} />
                  </DrawerNavItem>
                  <DrawerNavItem label="Orders" onClick={() => alert('Orders history coming soon')}>
                    <ClockCounterClockwise size={18} weight="regular" color="rgba(0,0,0,0.6)" />
                  </DrawerNavItem>
                  <DrawerNavItem label="Notifications" onClick={() => alert('No new notifications')}>
                    <Bell size={18} weight="regular" color="rgba(0,0,0,0.6)" />
                  </DrawerNavItem>
                  {!loggedIn && (
                    <DrawerNavItem label="Contact Us" onClick={() => alert('Call Us: +233 000 000 000')}>
                      <Phone size={18} weight="regular" color="rgba(0,0,0,0.6)" />
                    </DrawerNavItem>
                  )}
                  {loggedIn && (
                    <DrawerNavItem label="Settings" onClick={() => alert('Settings clicked')}>
                      <Gear size={18} weight="regular" color="rgba(0,0,0,0.6)" />
                    </DrawerNavItem>
                  )}

                  <div style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.06)', margin: '4px 2px' }} />

                  {loggedIn ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px' }}>
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          backgroundColor: PRIMARY,
                          color: 'white',
                          fontWeight: 700,
                          fontSize: 11,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {userInitials || 'U'}
                      </div>
                      <p style={{ fontSize: 14 }}>My Account</p>
                    </div>
                  ) : (
                    <>
                      <DrawerNavItem
                        accent
                        label="Sign Up"
                        onClick={() => {
                          setMenuOpen(false);
                          setAuthStep('google');
                        }}
                      >
                        <UserPlus size={18} weight="regular" color={PRIMARY} />
                      </DrawerNavItem>
                      <DrawerNavItem
                        label="Log In"
                        onClick={() => {
                          setMenuOpen(false);
                          setAuthStep('google');
                        }}
                      >
                        <SignIn size={18} weight="regular" color="rgba(0,0,0,0.6)" />
                      </DrawerNavItem>
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* Order card */}
        <div
          style={{
            position: 'absolute',
            top: isMobile ? undefined : 24,
            bottom: isMobile ? 10 : undefined,
            left: isMobile ? 12 : 24,
            right: isMobile ? 12 : undefined,
            width: isMobile ? undefined : 365,
            maxHeight: isMobile ? 'calc(100dvh - 88px)' : undefined,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: isMobile ? 'grid' : 'flex',
              flexDirection: 'column',
              gap: isMobile ? 0 : 11,
              
            }}
          >
          {/* Main order content (fades out behind the schedule panel on mobile) */}
          <div
            style={
              isMobile
                ? {
                    gridArea: '1 / 1',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'opacity 250ms ease, transform 250ms ease',
                    opacity: scheduleView ? 0 : 1,
                    transform: scheduleView ? 'translateY(-6px) scale(0.98)' : 'translateY(0) scale(1)',
                    pointerEvents: scheduleView ? 'none' : 'auto',
                    
                  }
                : { display: 'flex', flexDirection: 'column', gap: 11 }
            }
          >
          <div
            style={{
              height: isMobile ? sheetHeight : undefined,
              overflow: isMobile ? 'hidden' : undefined,
              transition: isMobile && !sheetDragging ? 'height 250ms ease' : undefined,
            }}
          >
          <div ref={sheetContentRef} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 0 : 11 }}>
          {/* Location + pickup time panel */}
          <div
            ref={sheetTitleCardRef}
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              borderBottomRightRadius: 24,
              borderBottomLeftRadius: 24,
              boxShadow: '0px 4px 4px -4px rgba(12,12,13,0.05), 0px 16px 32px -4px rgba(12,12,13,0.10)',
              outline: '1px solid rgba(0,0,0,0.10)',
              outlineOffset: -1,
              overflow: 'hidden',
            }}
          >
            {isMobile && (
              <div
                onPointerDown={(e) => {
                  handleSheetDragStart(e.clientY);
                  (e.target as Element).setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => sheetDragging && handleSheetDragMove(e.clientY)}
                onPointerUp={handleSheetDragEnd}
                onPointerCancel={handleSheetDragEnd}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '10px 0 0',
                  cursor: 'grab',
                  touchAction: 'none',
                }}
              >
                <div style={{ width: 36, height: 4, borderRadius: 9999, backgroundColor: 'rgba(0,0,0,0.2)' }} />
              </div>
            )}

            <div
              style={{
                padding: '20px 17px 0',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <p
                style={{
                  fontSize: isMobile ? 18 : 22,
                  fontWeight: 700,
                  textTransform: 'capitalize',
                }}
              >
                Your Hassle-Free Solution For{' '}
                <span style={{ color: 'rgba(0,0,0,0.6)' }}>Convenient LPG Refill</span>
              </p>

              {isMobile && (
                <div
                  onClick={() => setScheduleView(true)}
                  style={{
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
           
                  }}
                >
                  <Clock size={18} weight="fill" color="#34C759" />
                </div>
              )}
            </div>

            <div
              style={{
                padding: '12px 16px',
                marginTop: 19,
                display: 'flex',
                alignItems: 'center',
                gap: 13,
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                cursor: 'pointer',
              }}
              onClick={() => {
                setLocationQuery('');
                setLocationSearchOpen(true);
              }}
            >
              <div
                style={{
                  padding: 6,
                  backgroundColor: '#FAFAFA',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MapPin size={20} weight="fill" color={PRIMARY} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>
                  Your Location
                </p>
                <p style={{ fontSize: 16, fontWeight: 500 }}>{locationText}</p>
              </div>
              <CaretRight size={16} weight="bold" color="rgba(0,0,0,0.5)" />
            </div>

            {!isMobile && (
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 13 }}>
                <div
                  style={{
                    padding: 6,
                    backgroundColor: '#FAFAFA',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Clock size={20} weight="fill" color="#34C759" />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>
                    Schedule Pick Up Time
                  </p>
                  <p style={{ fontSize: 16, fontWeight: 500 }}>{pickupTime}</p>
                </div>
                <PencilSimple
                  size={16}
                  weight="bold"
                  color="rgba(0,0,0,0.5)"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setEditingTime((v) => !v)}
                />
              </div>
            )}

            {editingTime && (
              <div style={{ display: 'flex', gap: 8, padding: '0 16px 16px' }}>
                {PICKUP_TIMES.map((t) => (
                  <p
                    key={t}
                    onClick={() => {
                      setPickupTime(t);
                      setEditingTime(false);
                    }}
                    style={{
                      fontSize: 12,
                      padding: '6px 10px',
                      borderRadius: 60,
                      cursor: 'pointer',
                      backgroundColor: pickupTime === t ? PRIMARY : '#FAFAFA',
                      color: pickupTime === t ? 'white' : 'black',
                      border: '1px solid rgba(0,0,0,0.1)',
                    }}
                  >
                    {t}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Cylinder size panel */}
          <div
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              borderBottomRightRadius: 24,
              borderBottomLeftRadius: 24,
              boxShadow: '0px 4px 4px -4px rgba(12,12,13,0.05), 0px 16px 32px -4px rgba(12,12,13,0.10)',
              outline: '1px solid rgba(0,0,0,0.10)',
              outlineOffset: -1,
              padding: '25px 13px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <p
              style={{
                paddingLeft: 4,
                fontSize: 20,
                fontWeight: 700,
                textTransform: 'capitalize',
              }}
            >
              Cylinder Size
            </p>
            <div style={{ display: 'flex', gap: 4 }}>
              {CYLINDERS.map((c) => {
                const selected = selectedCylinder === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCylinder(c.id)}
                    style={{
                      position: 'relative',
                      flex: 1,
                      minWidth: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      padding: 12,
                      borderRadius: 16,
                      cursor: 'pointer',
                      backgroundColor: selected ? '#F4F4F4' : 'transparent',
                    }}
                  >
                    {selected && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`${c.name}: holds up to the standard ${c.name.toLowerCase()} cylinder volume.`);
                        }}
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          border: '1px solid rgba(0,0,0,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Info size={13} weight="regular" color="rgba(0,0,0,0.5)" />
                      </div>
                    )}
                    <img src={c.img} alt={c.name} style={{ width: 48, height: 72, objectFit: 'contain' }} />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: selected ? 700 : 400 }}>{c.name}</p>
                      <p style={{ fontSize: 14, fontWeight: selected ? 700 : 400, color: 'rgba(0,0,0,0.6)' }}>
                        GH {priceFor(c.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rider instructions panel */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: 16,
              boxShadow: '0px 4px 4px -4px rgba(12,12,13,0.05), 0px 16px 32px -4px rgba(12,12,13,0.10)',
              outline: '1px solid rgba(0,0,0,0.10)',
              outlineOffset: -1,
            }}
          >
            <input
              value={riderInstructions}
              onChange={(e) => setRiderInstructions(e.target.value)}
              placeholder="Rider Instructions..."
              style={{
                width: '100%',
                padding: '18px 17px',
                fontSize: 14,
                border: 'none',
                borderRadius: 16,
                background: 'transparent',
              }}
            />
          </div>
          </div>
          </div>
          </div>

          {/* Schedule Pick Up panel (mobile only, crossfades in over the main content) */}
          {isMobile && (
            <div
              style={{
                gridArea: '1 / 1',
                alignSelf: 'end',
                backgroundColor: 'white',
                borderRadius: 24,
                boxShadow: '0px 4px 4px -4px rgba(12,12,13,0.05), 0px 16px 32px -4px rgba(12,12,13,0.10)',
                outline: '1px solid rgba(0,0,0,0.10)',
                outlineOffset: -1,
                padding: 17,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'opacity 250ms ease, transform 250ms ease',
                opacity: scheduleView ? 1 : 0,
                transform: scheduleView ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.98)',
                pointerEvents: scheduleView ? 'auto' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontSize: 17, fontWeight: 700 }}>Schedule Pick Up</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: PRIMARY, cursor: 'pointer' }} onClick={handleSaveSchedule}>
                  Save
                </p>
              </div>

              <div style={{ display: 'flex', backgroundColor: '#F4F4F4', borderRadius: 9999, padding: 4, gap: 4 }}>
                {(['instantly', 'tomorrow', 'custom'] as const).map((mode) => {
                  const isSelected = pickupMode === mode;
                  const label =
                    mode === 'instantly'
                      ? 'Instantly'
                      : mode === 'tomorrow'
                      ? 'Tomorrow'
                      : customDate
                      ? new Date(customDate + 'T00:00:00').toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Pick Date';

                  const segmentStyle: React.CSSProperties = {
                    flex: 1,
                    position: 'relative',
                    textAlign: 'center',
                    padding: '8px 4px',
                    borderRadius: 9999,
                    cursor: 'pointer',
                    backgroundColor: isSelected ? 'white' : 'transparent',
                    boxShadow: isSelected ? '0 1px 4px rgba(0,0,0,0.15)' : 'none',
                    fontSize: 13,
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? 'black' : 'rgba(0,0,0,0.5)',
                  };

                  if (mode === 'custom') {
                    return (
                      <div key={mode} style={segmentStyle}>
                        {label}
                        {/* A real date input sits on top so tapping it opens the OS's
                            native picker directly — the only reliable cross-browser
                            way to trigger it, rather than relying on showPicker()/focus(). */}
                        <input
                          ref={dateInputRef}
                          type="date"
                          value={customDate}
                          onChange={(e) => {
                            setCustomDate(e.target.value);
                            setPickupMode('custom');
                          }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            cursor: 'pointer',
                          }}
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={mode} onClick={() => setPickupMode(mode)} style={segmentStyle}>
                      {label}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          </div>

          {/* Order button (stays fixed; only the content above scrolls on mobile) */}
          <button
            onClick={handleMainButtonClick}
            style={{
              marginTop: isMobile ? 12 : 11,
              flexShrink: 0,
              backgroundColor: PRIMARY,
              color: 'white',
              border: 'none',
              borderRadius: 9999,
              padding: '12px 16px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {loggedIn ? 'Place Order' : 'Log In Order'}
          </button>
        </div>
      </div>

      {/* Location search overlay */}
      {locationSearchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2500,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '20px 17px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 13,
              borderBottom: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                padding: 6,
                backgroundColor: '#FAFAFA',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MapPin size={20} weight="fill" color={PRIMARY} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>Your Location</p>
              <input
                autoFocus
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder={locationText}
                style={{ border: 'none', outline: 'none', fontSize: 16, fontWeight: 600, width: '100%' }}
              />
            </div>
            <X
              size={18}
              weight="bold"
              color="rgba(0,0,0,0.6)"
              style={{ cursor: 'pointer' }}
              onClick={() => setLocationSearchOpen(false)}
            />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 17px' }}>
            {recentSearches.length > 0 && (
              <>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Recent</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
                  {recentSearches.map((r) => (
                    <div
                      key={r}
                      onClick={() => handleSelectLocation(r)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 12px',
                        borderRadius: 9999,
                        backgroundColor: '#F4F4F4',
                        fontSize: 13,
                        cursor: 'pointer',
                      }}
                    >
                      <MagnifyingGlass size={12} weight="bold" color="rgba(0,0,0,0.5)" />
                      {r}
                    </div>
                  ))}
                </div>
              </>
            )}

            <div
              onClick={handleUseCurrentLocation}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 0',
                cursor: 'pointer',
              }}
            >
              <NavigationArrow size={18} weight="fill" color={PRIMARY} />
              <p style={{ flex: 1, fontSize: 15, fontWeight: 600, color: PRIMARY }}>Your Current Location</p>
              <CaretRight size={16} weight="bold" color={PRIMARY} />
            </div>

            <div style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.06)', margin: '6px 0 2px' }} />

            {LOCATION_SUGGESTIONS.filter((s) => s.toLowerCase().includes(locationQuery.toLowerCase())).map(
              (s, i, arr) => (
                <div
                  key={s}
                  onClick={() => handleSelectLocation(s)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '14px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <MapPin size={18} weight="regular" color="rgba(0,0,0,0.5)" />
                  <p style={{ flex: 1, fontSize: 15 }}>{s}</p>
                  <CaretRight size={16} weight="bold" color="rgba(0,0,0,0.3)" />
                </div>
              ),
            )}
          </div>
        </div>
      )}

      {/* Auth screen (full-screen takeover, not a popup modal) */}
      {authStep !== 'none' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Hero header */}
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(180deg, #E6F3FF 0%, #FFFFFF 100%)',
              paddingTop: 48,
              paddingBottom: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div
              onClick={() => setAuthStep('none')}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: 'white',
                boxShadow: '0px 2px 6px 2px rgba(0,0,0,0.15), 0px 1px 2px rgba(0,0,0,0.30)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} weight="bold" color="#1D1B20" />
            </div>

            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 24,
                backgroundColor: 'white',
                boxShadow: '0px 4px 16px rgba(0,136,255,0.18)',
                outline: '1px solid rgba(0,0,0,0.05)',
                outlineOffset: -1,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img className="logo-swing" src="/logo.svg" alt="GasApp" style={{ width: 44, height: 'auto' }} />
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: authStep === 'google' ? 'flex-start' : 'flex-start',
              padding: '32px 28px',
              gap: 24,
            }}
          >
            {authStep === 'google' ? (
              <>
                <p style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', maxWidth: 360 }}>
                  Your Hassle-Free Solution for{' '}
                  <span style={{ color: 'rgba(0,0,0,0.6)' }}>convenient LPG refill</span>
                </p>

                <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <button
                    onClick={handleContinueWithGoogle}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0,
                      backgroundColor: PRIMARY,
                      color: 'white',
                      border: 'none',
                      borderRadius: 9999,
                      height: 52,
                      width: '100%',
                      cursor: 'pointer',
                      boxShadow: '0px 8px 20px -4px rgba(0,136,255,0.45)',
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        marginLeft: 12,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                        <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13 18.63 6.71 16.7 5.84 14.1H2.16V16.95C3.97 20.53 7.7 23 12 23Z" fill="#34A853"/>
                        <path d="M5.84 14.1C5.62 13.44 5.49 12.73 5.49 12C5.49 11.27 5.62 10.56 5.84 9.9V7.05H2.16C1.42 8.53 1 10.22 1 12C1 13.78 1.42 15.47 2.16 16.95L5.84 14.1Z" fill="#FBBC05"/>
                        <path d="M12 5.37C13.62 5.37 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.97 3.47 2.16 7.05L5.84 9.9C6.71 7.3 9.13 5.37 12 5.37Z" fill="#EA4335"/>
                      </svg>
                    </span>
                    <span
                      style={{
                        width: 1,
                        height: 28,
                        marginLeft: 10,
                        backgroundColor: 'rgba(255,255,255,0.25)',
                      }}
                    />
                    <span style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>Continue with Google</span>
                  </button>
                  <p style={{ fontSize: 11, textAlign: 'center', color: 'rgba(0,0,0,0.33)' }}>
                    By using gas app, you agree to our Terms of Service
                    <br />
                    and Privacy Policy.
                  </p>
                </div>
              </>
            ) : (
              <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 22, fontWeight: 700 }}>Your Contact Details</p>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <p style={{ fontSize: 13 }}>Phone Number</p>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    style={{
                      backgroundColor: '#FAFAFA',
                      padding: 10,
                      borderRadius: 12,
                      border: '1px solid rgba(0,0,0,0.1)',
                      width: '100%',
                    }}
                  />
                </div>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <p style={{ fontSize: 13 }}>Email</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    style={{
                      backgroundColor: '#FAFAFA',
                      padding: 10,
                      borderRadius: 12,
                      border: '1px solid rgba(0,0,0,0.1)',
                      width: '100%',
                    }}
                  />
                </div>

                <button
                  onClick={handleCompleteProfile}
                  style={{
                    backgroundColor: PRIMARY,
                    color: 'white',
                    border: 'none',
                    borderRadius: 9999,
                    padding: '14px 24px',
                    width: '100%',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  Complete Profile
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
