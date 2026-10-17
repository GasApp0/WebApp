import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CircleNotch, GasPump, Scooter } from '@phosphor-icons/react';
import MapView from '../components/MapView';

const PRIMARY = '#0088FF';
const GREEN = '#52B922';
const BLUE = '#0085FF';
const ASSIGNING_DURATION = 3000;

const STEPS = [
  { key: 'rider', icon: Scooter, title: 'Rider has arrived at the filling Station' },
  { key: 'filling', icon: GasPump, title: 'Filling Process' },
  { key: 'refill', icon: CheckCircle, title: 'Refill Completion' },
] as const;

type Status = 'completed' | 'active' | 'pending';

function Connector({ color }: { color: string | null }) {
  return (
    <div
      style={{
        width: 2,
        minHeight: 23,
        flex: 1,
        marginTop: 4,
        backgroundColor: color ?? 'transparent',
        borderLeft: color ? 'none' : '1px dashed rgba(0,0,0,0.2)',
      }}
    />
  );
}

function ProgressBar({ color, progress }: { color: string; progress: number }) {
  return (
    <div style={{ width: '100%', maxWidth: 218, height: 7, borderRadius: 24, backgroundColor: '#F4F4F4', overflow: 'hidden' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: 24,
          transition: 'width 0.4s ease',
        }}
      />
    </div>
  );
}

// Step 1 and step 3 share a stacked layout (icon, then title/subtitle/progress bar).
function StackedStep({
  icon: Icon,
  title,
  subtitle,
  status,
  progress,
  isLast,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  status: Status;
  progress: number;
  isLast: boolean;
}) {
  const bg = status === 'pending' ? '#FAFAFA' : status === 'completed' ? GREEN : BLUE;
  const showOutline = status === 'active';

  return (
    <div style={{ display: 'flex', gap: 14 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            padding: 10,
            borderRadius: 40,
            backgroundColor: bg,
            outline: showOutline ? '1px solid rgba(0,0,0,0.10)' : undefined,
            outlineOffset: showOutline ? -1 : undefined,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={16} weight="fill" color={status === 'pending' ? 'rgba(0,0,0,0.3)' : 'white'} />
        </div>
        {!isLast && <Connector color={status === 'pending' ? null : bg} />}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 24, flex: 1 }}>
        <p style={{ fontSize: 12, color: 'black' }}>{title}</p>
        <p style={{ fontSize: 10, color: 'rgba(0,0,0,0.6)' }}>{subtitle}</p>
        {status !== 'pending' && <ProgressBar color={bg} progress={progress} />}
      </div>
    </div>
  );
}

// Step 2 (filling) is compact: icon + inline title, with a "Completed"/"In
// Progress" pill instead of its own subtitle and progress bar.
function FillingStep({ status, isLast }: { status: Status; isLast: boolean }) {
  const bg = status === 'pending' ? '#FAFAFA' : BLUE;
  const badgeText = status === 'completed' ? 'Completed' : status === 'active' ? 'In Progress' : null;
  const badgeColor = status === 'completed' ? GREEN : BLUE;

  return (
    <div style={{ display: 'flex', gap: 9 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            padding: 8,
            borderRadius: 40,
            backgroundColor: bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <GasPump size={16} weight="fill" color={status === 'pending' ? 'rgba(0,0,0,0.3)' : 'white'} />
        </div>
        {!isLast && <Connector color={status === 'pending' ? null : bg} />}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 24 }}>
        <p style={{ fontSize: 12, color: 'black' }}>Filling Process</p>
        {badgeText && (
          <span
            style={{
              padding: '6px 8px',
              backgroundColor: '#FAFAFA',
              borderRadius: 24,
              fontSize: 10,
              color: badgeColor,
            }}
          >
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}

function Tracker() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [assigning, setAssigning] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [refillProgress, setRefillProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Backend disabled: simulate matching a rider, then the rider → filling →
  // refill journey, locally instead of polling a live order-status endpoint.
  useEffect(() => {
    const toAssigned = setTimeout(() => setAssigning(false), ASSIGNING_DURATION);
    const toFilling = setTimeout(() => setCurrentStep(1), ASSIGNING_DURATION + 4000);
    const toRefill = setTimeout(() => setCurrentStep(2), ASSIGNING_DURATION + 8000);
    return () => {
      clearTimeout(toAssigned);
      clearTimeout(toFilling);
      clearTimeout(toRefill);
    };
  }, []);

  useEffect(() => {
    if (currentStep !== 2) return;
    const interval = setInterval(() => {
      setRefillProgress((p) => Math.min(100, p + 4));
    }, 500);
    return () => clearInterval(interval);
  }, [currentStep]);

  const statusFor = (index: number): 'completed' | 'active' | 'pending' =>
    index < currentStep ? 'completed' : index === currentStep ? 'active' : 'pending';

  const subtitleFor = (index: number) => {
    const status = statusFor(index);
    if (index === 0) return status === 'completed' ? 'Completed' : status === 'active' ? 'Arriving in 15 to 30 minutes' : 'Waiting';
    if (status === 'completed') return 'Delivered';
    if (status === 'active') return 'Arriving in 5 minutes';
    return 'n/a';
  };

  const progressFor = (index: number) => {
    const status = statusFor(index);
    if (status === 'completed') return 100;
    if (status !== 'active') return 0;
    if (index === 2) return refillProgress;
    return 55;
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden' }}>
      <MapView />

      {/* Back button */}
      <div
        onClick={() => navigate('/home')}
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
        <ArrowLeft size={20} weight="bold" color="black" />
      </div>

      {/* Bottom sheet: tracking info */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 12,
          right: 12,
          maxHeight: 'calc(100dvh - 88px)',
          overflowY: 'auto',
          backgroundColor: 'white',
          borderRadius: 24,
          boxShadow: '0px 4px 4px -4px rgba(12,12,13,0.05), 0px 16px 32px -4px rgba(12,12,13,0.10)',
          outline: '1px solid rgba(0,0,0,0.10)',
          outlineOffset: -1,
          margin: isMobile ? undefined : '0 auto',
          width: isMobile ? undefined : 420,
          zIndex: 1000,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 9999, backgroundColor: 'rgba(0,0,0,0.2)' }} />
        </div>

        <div style={{ padding: '12px 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>Hello 👋</p>
            <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.6)' }}>
              Let's fill your LPG for you in less than 5 minutes
            </p>
          </div>

          {assigning ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '16px 0' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,136,255,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircleNotch className="spin" size={26} weight="bold" color={PRIMARY} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 16, fontWeight: 700 }}>Finding your rider...</p>
                <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)', marginTop: 4 }}>
                  We're matching you with the nearest available rider
                </p>
              </div>
            </div>
          ) : (
            <>
              <div>
                <p style={{ fontSize: 17, fontWeight: 700 }}>Track All Activities Here</p>
                <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>
                  Enjoy real time track system as your gas cylinder gets filled
                </p>
              </div>

              <div>
                <StackedStep
                  icon={STEPS[0].icon}
                  title={STEPS[0].title}
                  subtitle={subtitleFor(0)}
                  status={statusFor(0)}
                  progress={progressFor(0)}
                  isLast={false}
                />
                <FillingStep status={statusFor(1)} isLast={false} />
                <StackedStep
                  icon={STEPS[2].icon}
                  title={STEPS[2].title}
                  subtitle={subtitleFor(2)}
                  status={statusFor(2)}
                  progress={progressFor(2)}
                  isLast
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tracker;
