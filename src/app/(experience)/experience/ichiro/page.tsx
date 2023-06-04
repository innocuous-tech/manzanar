'use client';
import {
  ClipboardQuestion,
  ClipboardQuestionState,
} from '@/app/(experience)/_components/ClipboardQuestion';
import { ContinueButton } from '@/app/(experience)/_components/ContinueButton';
import { IchiroStatement } from '@/app/(experience)/_components/IchiroStatement';
import { MenuDialogContent } from '@/app/(experience)/_components/MenuDialogContent';
import { Q27 } from '@/app/(experience)/_components/Q27';
import { Q28 } from '@/app/(experience)/_components/Q28';
import { QCustom } from '@/app/(experience)/_components/QCustom';
import { TranscriptDialogButton } from '@/app/(experience)/_components/TranscriptDialogButton';
import {
  Transcript,
  TranscriptDialogContent,
} from '@/app/(experience)/_components/TranscriptDialogContent';
import { UserStatement } from '@/app/(experience)/_components/UserStatement';
import { cms } from '@/cms';
import { AutoExpandingTextArea } from '@/components/AutoExpandingTextArea';
import { Button } from '@/components/Button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/Dialog';
import { IchiroAvatar, IchiroVariant } from '@/components/IchiroAvatar';
import { IconButton } from '@/components/IconButton';
import { Tooltip } from '@/components/Tooltip';
import va from '@vercel/analytics';
import clsx from 'clsx';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import Link from 'next/link';
import { ReactComponent as MenuIcon } from 'public/icons/menu.svg';
import { useEffect, useState } from 'react';

export default function Page() {
  const [isAnimatingClipboard, setIsAnimatingClipboard] =
    useState<boolean>(false);
  const [ichiroVariant, setIchiroVariant] = useState<IchiroVariant>('neutral');
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isTranscriptVisible, setIsTranscriptVisible] =
    useState<boolean>(false);
  const [clipboardState, setClipboardState] = useState<{
    27: ClipboardQuestionState;
    28: ClipboardQuestionState;
  }>({ 27: { Y: false, N: false }, 28: { Y: false, N: false } });

  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [questionsAsked, setQuestionsAsked] = useState<number>(0);
  const incrementQuestionsAsked = () => setQuestionsAsked((prev) => prev + 1);

  const [step, setStep] = useState<
    '0.0' | '0.1' | 'q27' | 'q28' | 'custom' | 'process-prompt' | 'process'
  >('0.0');

  const [remainingQuestions, setRemainingQuestions] = useState<(27 | 28)[]>([
    27, 28,
  ]);
  const [transcript, setTranscript] = useState<Transcript>([
    { origin: 'ichiro', message: cms['0.0'] },
  ]);

  const goToQ27 = () => {
    va.track('Q27 Asked');
    setTranscript((prev) => [...prev, { origin: 'user', message: cms.q27 }]);
    incrementQuestionsAsked();
    setRemainingQuestions((prev) => prev.filter((q) => q !== 27));
    setStep('q27');
    setIchiroVariant('ear-grab');
  };

  const goToQ28 = () => {
    va.track('Q28 Asked');
    setTranscript((prev) => [...prev, { origin: 'user', message: cms.q28 }]);
    incrementQuestionsAsked();
    setRemainingQuestions((prev) => prev.filter((q) => q !== 28));
    setStep('q28');
    setIchiroVariant('side-eye');
  };

  const goToQCustom = (customMessage: string) => {
    va.track('Custom Question Asked', { text: customQuestion });
    setTranscript((prev) => [
      ...prev,
      { origin: 'user', message: customMessage },
    ]);
    incrementQuestionsAsked();
    setCustomQuestion(customMessage);
    setStep('custom');
    setIchiroVariant('neutral');
  };

  const mostRecentTranscriptEntry = transcript.at(-1);
  const isClipboardFinished =
    clipboardState[27].N === true && clipboardState[28].N === true;

  const shouldForceProcess = questionsAsked > 3;
  const shouldProcess = isClipboardFinished || shouldForceProcess;

  const promptProcessing = () => {
    setTranscript((prev) => [
      ...prev,
      { origin: 'ichiro', message: cms['1.0'] },
    ]);
    setStep('process-prompt');
  };

  const animationControls = useAnimationControls();

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (shouldProcess && !isAnimatingClipboard) {
      timeout = setTimeout(promptProcessing, 200);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isAnimatingClipboard, shouldProcess]);

  useEffect(() => {
    const animateClipBoard = async () => {
      await animationControls.start({ opacity: 0 }, { duration: 0.4 });
      await animationControls.start(
        { opacity: 1 },
        { duration: 0.4, delay: 1.5 },
      );
    };

    if ([clipboardState[27].Y, clipboardState[28].Y].includes(true)) {
      setIsAnimatingClipboard(true);
      animateClipBoard().then(() => setIsAnimatingClipboard(false));
    }

    const timeout = setTimeout(() => {
      if (clipboardState[27].Y === true) {
        setClipboardState((prev) => ({
          ...prev,
          27: { Y: 'indeterminate', N: true },
        }));
      }

      if (clipboardState[28].Y === true) {
        setClipboardState((prev) => ({
          ...prev,
          28: { Y: 'indeterminate', N: true },
        }));
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [animationControls, clipboardState]);

  const isQ27ButtonDisabled = !remainingQuestions.includes(27);
  const isQ28ButtonDisabled = !remainingQuestions.includes(28);

  return (
    <div className="relative h-screen w-screen bg-[url('/images/bg1.png')] bg-cover text-lg sm:text-xl md:text-3xl">
      <AnimatePresence>
        {!isTranscriptVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dialog onOpenChange={setIsMenuVisible}>
              {/**
               * Because we use this IconButton as a DialogTrigger, we need to ignore the Tooltip
               * abstraction within the IconButton component because IconButton provider isn't an
               * element that can take click events.
               */}
              <Tooltip content="Open Menu">
                <DialogTrigger asChild>
                  <IconButton
                    className={clsx(
                      'absolute right-4 top-4 sm:right-8 sm:top-8',
                      { ['hidden']: isMenuVisible },
                    )}
                    label="Open Menu"
                    variant="solid"
                    hasTooltip={false}
                  >
                    <MenuIcon />
                  </IconButton>
                </DialogTrigger>
              </Tooltip>

              <DialogContent variant="full-screen-overlay">
                <MenuDialogContent />
              </DialogContent>
            </Dialog>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog onOpenChange={setIsTranscriptVisible}>
        <TranscriptDialogContent transcript={transcript} />

        <AnimatePresence>
          {!isTranscriptVisible && (
            <motion.div
              className="mx-auto h-full p-4 pt-[6rem] sm:max-w-[calc(100%-(64px*3))] sm:px-16 sm:py-8"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative z-20 h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    className="flex h-full flex-col justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {step === '0.0' && (
                      <>
                        <aside className="panel block">{cms.start}</aside>

                        <motion.section
                          className="bottom-panel"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, delay: 1 }}
                        >
                          <IchiroStatement>{cms['0.0']}</IchiroStatement>

                          <ContinueButton onClick={() => setStep('0.1')} />
                        </motion.section>
                      </>
                    )}

                    {step === '0.1' && (
                      <>
                        {mostRecentTranscriptEntry && (
                          <aside className="panel block">
                            {mostRecentTranscriptEntry.origin === 'ichiro' ? (
                              <IchiroStatement>
                                {mostRecentTranscriptEntry.message}
                              </IchiroStatement>
                            ) : (
                              <UserStatement>
                                {mostRecentTranscriptEntry.message}
                              </UserStatement>
                            )}
                          </aside>
                        )}

                        <div className="fixed inset-0 top-[unset]">
                          {/* Clipboard Here - Note: `right` and `scale` are directly related */}
                          <motion.aside
                            className="absolute -right-4 -top-[28rem] flex hidden h-[28rem] w-96 origin-bottom scale-75 flex-col bg-[url('/images/clipboard.webp')] bg-cover md:block xl:right-4 xl:scale-90 2xl:right-8 2xl:scale-100"
                            animate={animationControls}
                          >
                            <div className="typography-clipboard flex flex-col gap-4 px-8 pt-48 text-darkBrownText">
                              <header>
                                OBJECTIVE:
                                <br />
                                INTERROGATE ICHIRO
                              </header>

                              <div className="flex flex-col gap-3">
                                <ClipboardQuestion
                                  label="Question 27:"
                                  fieldState={clipboardState[27]}
                                  setFieldState={(newState) => {
                                    setRemainingQuestions((prev) =>
                                      [...prev].filter((q) => q !== 27),
                                    );

                                    if (
                                      newState.N === true &&
                                      remainingQuestions.includes(27)
                                    ) {
                                      setTranscript((prev) => [
                                        ...prev,
                                        {
                                          origin: 'ichiro',
                                          message: cms['2.6'],
                                        },
                                      ]);
                                    }

                                    if (newState.Y === true) {
                                      setTranscript((prev) => [
                                        ...prev,
                                        {
                                          origin: 'ichiro',
                                          message: cms['2.4_yes27'],
                                        },
                                      ]);
                                    }

                                    setClipboardState((prev) => ({
                                      ...prev,
                                      27: newState,
                                    }));
                                  }}
                                />
                                <ClipboardQuestion
                                  label="Question 28:"
                                  fieldState={clipboardState[28]}
                                  setFieldState={(newState) => {
                                    setRemainingQuestions((prev) =>
                                      [...prev].filter((q) => q !== 28),
                                    );

                                    if (
                                      newState.N === true &&
                                      remainingQuestions.includes(28)
                                    ) {
                                      setTranscript((prev) => [
                                        ...prev,
                                        {
                                          origin: 'ichiro',
                                          message: cms['2.7'],
                                        },
                                      ]);
                                    }

                                    if (newState.Y === true) {
                                      setTranscript((prev) => [
                                        ...prev,
                                        {
                                          origin: 'ichiro',
                                          message: cms['2.4_yes28'],
                                        },
                                      ]);
                                    }

                                    setClipboardState((prev) => ({
                                      ...prev,
                                      28: newState,
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                          </motion.aside>

                          <section className="justify-0.0 relative z-10 flex flex-col items-center gap-6 bg-darkBrownOverlay p-4 sm:h-80 sm:gap-8 sm:px-16 sm:py-12">
                            <div className="flex w-full flex-col gap-4 sm:w-[unset] sm:flex-row sm:gap-16">
                              <Tooltip content={`Question 27: ${cms.q27}`}>
                                <Button
                                  onClick={goToQ27}
                                  disabled={isQ27ButtonDisabled}
                                >
                                  {isQ27ButtonDisabled
                                    ? 'Question 27 Answered'
                                    : 'Ask Question 27'}
                                </Button>
                              </Tooltip>

                              <Tooltip content={`Question 28: ${cms.q28}`}>
                                <Button
                                  onClick={goToQ28}
                                  disabled={isQ28ButtonDisabled}
                                >
                                  {isQ28ButtonDisabled
                                    ? 'Question 28 Answered'
                                    : 'Ask Question 28'}
                                </Button>
                              </Tooltip>
                            </div>

                            <div className="flex w-full items-center gap-6 sm:max-w-[var(--usualMaxWidth)] sm:gap-10">
                              <AutoExpandingTextArea
                                label="Custom message for Ichiro. Please note that hitting ENTER will submit the form."
                                onSubmit={({ aetextarea }) => {
                                  goToQCustom(aetextarea);
                                }}
                                placeholder="Type something to say to Ichiro"
                              />

                              <TranscriptDialogButton />
                            </div>
                          </section>
                        </div>
                      </>
                    )}

                    {step === 'q27' && (
                      <Q27
                        setTranscript={setTranscript}
                        setIchiroVariant={setIchiroVariant}
                        onComplete={() => {
                          setIchiroVariant('neutral');
                          shouldProcess ? promptProcessing() : setStep('0.1');
                        }}
                      />
                    )}

                    {step === 'q28' && (
                      <Q28
                        setTranscript={setTranscript}
                        setIchiroVariant={setIchiroVariant}
                        onComplete={() => {
                          setIchiroVariant('neutral');
                          shouldProcess ? promptProcessing() : setStep('0.1');
                        }}
                      />
                    )}

                    {step === 'custom' && (
                      <QCustom
                        message={customQuestion}
                        setTranscript={setTranscript}
                        setIchiroVariant={setIchiroVariant}
                        onComplete={() => {
                          setCustomQuestion('');
                          setIchiroVariant('neutral');

                          return shouldProcess
                            ? promptProcessing()
                            : setStep('0.1');
                        }}
                      />
                    )}

                    {step === 'process-prompt' && (
                      <>
                        {mostRecentTranscriptEntry && (
                          <aside className="panel block">
                            {mostRecentTranscriptEntry.origin === 'ichiro' ? (
                              <IchiroStatement>
                                {mostRecentTranscriptEntry.message}
                              </IchiroStatement>
                            ) : (
                              <UserStatement>
                                {mostRecentTranscriptEntry.message}
                              </UserStatement>
                            )}
                          </aside>
                        )}

                        <section className="bottom-panel flex items-center justify-center p-12">
                          <Tooltip content={cms.process_ichiro}>
                            <Button
                              onClick={() => {
                                setStep('process');
                                setTranscript((prev) => [
                                  ...prev,
                                  {
                                    origin: 'user',
                                    message: cms.process_ichiro,
                                  },
                                  { origin: 'ichiro', message: cms['0.3'] },
                                ]);
                              }}
                            >
                              Process Ichiro
                            </Button>
                          </Tooltip>
                        </section>
                      </>
                    )}

                    {step === 'process' && (
                      <>
                        <aside className="panel block">
                          <UserStatement>{cms.process_ichiro}</UserStatement>
                        </aside>

                        <motion.section
                          className="bottom-panel"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, delay: 1 }}
                        >
                          <IchiroStatement>{cms['0.3']}</IchiroStatement>

                          <Link href="/experience/media/video-2">
                            <ContinueButton>Dimiss Ichiro</ContinueButton>
                          </Link>
                        </motion.section>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <IchiroAvatar variant={ichiroVariant} />
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}
