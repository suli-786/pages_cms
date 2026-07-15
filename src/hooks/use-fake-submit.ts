import { useState, type FormEvent } from 'react';

export type FakeSubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Placeholder submit shared by the contact form and the footer newsletter
 * until a real backend exists: fake 1.2s latency, then success — or error when
 * the email contains "fail" (manual testing hook). Replace the setTimeout with
 * a fetch when wiring both forms to a backend.
 */
export function useFakeSubmit(opts?: {
  onSuccess?: (form: HTMLFormElement) => void;
}) {
  const [status, setStatus] = useState<FakeSubmitStatus>('idle');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get('email') ?? '');
    setStatus('submitting');
    window.setTimeout(() => {
      if (email.toLowerCase().includes('fail')) {
        setStatus('error');
      } else {
        setStatus('success');
        opts?.onSuccess?.(form);
      }
    }, 1200);
  };

  return { status, busy: status === 'submitting', onSubmit };
}
