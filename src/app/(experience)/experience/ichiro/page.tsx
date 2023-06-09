'use client';
import {
  ClipboardQuestion,
  ClipboardQuestionState,
} from '@/app/(experience)/_components/ClipboardQuestion';
import { ContinueButton } from '@/app/(experience)/_components/ContinueButton';
import { IchiroStatement } from '@/app/(experience)/_components/IchiroStatement';
import { MenuDialogContent } from '@/app/(experience)/_components/MenuDialogContent';
import { ProcessIchiroButton } from '@/app/(experience)/_components/ProcessIchiroButton';
import { Q27 } from '@/app/(experience)/_components/Q27';
import { Q28 } from '@/app/(experience)/_components/Q28';
import { QCustom } from '@/app/(experience)/_components/QCustom';
import { TopPanel } from '@/app/(experience)/_components/TopPanel';
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
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const [ichiroVariant, setIchiroVariant] = useState<IchiroVariant>('neutral');
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const [isTranscriptVisible, setIsTranscriptVisible] =
    useState<boolean>(false);

  const [clipboardState, setClipboardState] = useState<{
    27: ClipboardQuestionState;
    28: ClipboardQuestionState;
  }>({ 27: { Y: false, N: false }, 28: { Y: false, N: false } });

  const [transcript, setTranscript] = useState<Transcript>([
    { origin: 'ichiro', message: cms['0.0'] },
  ]);

  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [customQuestionBudget, setCustomQuestionBudget] = useState<number>(
    cms.customQuestionBudget,
  );
  const resetChatBudget = () =>
    setCustomQuestionBudget(cms.customQuestionBudget);
  const lowerChatBudget = () => setCustomQuestionBudget((x) => x - 1);
  const hasChatBudget = customQuestionBudget > 0;

  const [step, setStep] = useState<
    | '0.0'
    | '0.1'
    | 'clipboard-27'
    | 'clipboard-28'
    | 'q27'
    | 'q28'
    | 'custom'
    | '2.3'
    | 'prompt-process'
    | 'process'
  >('0.0');

  const [remainingQuestions, setRemainingQuestions] = useState<(27 | 28)[]>([
    27, 28,
  ]);

  const markQ27Asked = () =>
    setRemainingQuestions((prev) => prev.filter((q) => q !== 27));
  const markQ28Asked = () =>
    setRemainingQuestions((prev) => prev.filter((q) => q !== 28));

  const goToQ27 = () => {
    va.track('Q27 Asked');
    setTranscript((prev) => [...prev, { origin: 'user', message: cms.q27 }]);
    markQ27Asked();
    resetChatBudget();
    setStep('q27');
  };

  const goToQ28 = () => {
    va.track('Q28 Asked');
    setTranscript((prev) => [...prev, { origin: 'user', message: cms.q28 }]);
    markQ28Asked();
    resetChatBudget();
    setStep('q28');
  };

  const goToQCustom = (customMessage: string) => {
    va.track('Custom Question Asked', { text: customQuestion });
    setTranscript((prev) => [
      ...prev,
      { origin: 'user', message: customMessage },
    ]);
    setCustomQuestion(customMessage);
    lowerChatBudget();
    setStep('custom');
  };

  const promptForcedProcessing = () => {
    setTranscript((prev) => [
      ...prev,
      { origin: 'ichiro', message: cms['1.0'] },
    ]);
    setStep('prompt-process');
  };

  const processIchiro = () => {
    setTranscript((prev) => [
      ...prev,
      {
        origin: 'user',
        message: cms.processIchiro,
      },
      { origin: 'ichiro', message: cms['0.3'] },
    ]);
    setStep('process');
  };

  const mostRecentTranscriptEntry = transcript.at(-1);

  const animationControls = useAnimationControls();
  const animateClipBoard = useCallback(async () => {
    await animationControls.start({ opacity: 0 }, { duration: 0.4 });
    await animationControls.start(
      { opacity: 1 },
      { duration: 0.4, delay: 1.6 },
    );
  }, [animationControls]);

  // MARK: Clipboard Correction Logic
  useEffect(() => {
    if ([clipboardState[27].Y, clipboardState[28].Y].includes(true)) {
      animateClipBoard();
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
    }, 500); // 100ms after the 400ms animation

    return () => clearTimeout(timeout);
  }, [animateClipBoard, clipboardState]);

  const isQ27Asked = !remainingQuestions.includes(27);
  const isQ28Asked = !remainingQuestions.includes(28);

  const onUserClipboardChange = (
    questionNumber: 27 | 28,
    nextState: ClipboardQuestionState,
  ) => {
    if (nextState.N === true && remainingQuestions.includes(questionNumber)) {
      setTranscript((prev) => [
        ...prev,
        {
          origin: 'ichiro',
          message: questionNumber === 27 ? cms['2.6'] : cms['2.7'],
        },
      ]);
    }

    if (nextState.Y === true) {
      setTranscript((prev) => [
        ...prev,
        {
          origin: 'ichiro',
          message: cms[`2.4_yes${questionNumber}`],
        },
      ]);
    }

    setClipboardState((prev) => ({
      ...prev,
      [questionNumber]: nextState,
    }));

    if (!isQ27Asked && questionNumber === 27) markQ27Asked();
    if (!isQ28Asked && questionNumber === 28) markQ28Asked();

    setStep('0.1');
  };

  return (
    <div className="relative w-screen bg-[url('/images/bg1.webp')] bg-cover text-lg h-view md:text-3xl lg:text-xl">
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
                      'absolute right-4 top-4 lg:right-8 lg:top-8',
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

      <div className="absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-darkBrownOverlay p-8 text-center lg:visible landscape:invisible">
        <h2 className="max-w-[50ch]">
          Please rotate your device or resize your browser window to enjoy the
          experience.
        </h2>
      </div>

      <Dialog onOpenChange={setIsTranscriptVisible}>
        <TranscriptDialogContent transcript={transcript} />

        <AnimatePresence>
          {!isTranscriptVisible && (
            <motion.div
              className="mx-auto h-full p-4 lg:max-w-[calc(100%-(64px*3))] lg:px-16 lg:py-8"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="pointer-events-none relative z-20 h-full portrait:invisible landscape:visible">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    className="flex h-full flex-col justify-between [&>*]:pointer-events-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {step === '0.0' && (
                      <>
                        <TopPanel>{cms.start}</TopPanel>

                        <motion.section
                          className="bottom-panel"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, delay: 1 }}
                        >
                          <IchiroStatement className="custom-scrollbar">
                            {cms['0.0']}
                          </IchiroStatement>

                          <ContinueButton onClick={() => setStep('0.1')} />
                        </motion.section>
                      </>
                    )}

                    {(step === '0.1' ||
                      step === 'clipboard-27' ||
                      step === 'clipboard-28' ||
                      step === '2.3') && (
                      <>
                        {mostRecentTranscriptEntry && (
                          <TopPanel>
                            {mostRecentTranscriptEntry.origin === 'ichiro' ? (
                              <IchiroStatement>
                                {mostRecentTranscriptEntry.message}
                              </IchiroStatement>
                            ) : (
                              <UserStatement>
                                {mostRecentTranscriptEntry.message}
                              </UserStatement>
                            )}
                          </TopPanel>
                        )}

                        <div className="fixed inset-0 top-[unset]">
                          {/* Clipboard Here - Note: `right` and `scale` are directly related */}
                          <motion.aside
                            className="absolute -right-24 -top-[21rem] flex h-[21rem] w-96 origin-bottom scale-[0.4] flex-col bg-[url('/images/clipboard.webp')] bg-cover lg:-right-4 lg:-top-[28rem] lg:h-[28rem] lg:scale-[0.6] xl:right-4 xl:scale-90 2xl:right-20 2xl:scale-125"
                            animate={animationControls}
                          >
                            <div className="typography-clipboard flex flex-col gap-4 px-8 pt-48 text-darkBrownText">
                              <header>
                                OBJECTIVE:
                                <br />
                                INTERROGATE ICHIRO
                              </header>

                              <div className="flex gap-6 lg:flex-col lg:gap-3">
                                <ClipboardQuestion
                                  label="Question 27:"
                                  fieldState={clipboardState[27]}
                                  setFieldState={(nextState) => {
                                    onUserClipboardChange(27, nextState);
                                  }}
                                  isInitialDisabled={step === 'clipboard-28'}
                                />
                                <ClipboardQuestion
                                  label="Question 28:"
                                  fieldState={clipboardState[28]}
                                  setFieldState={(nextState) => {
                                    onUserClipboardChange(28, nextState);
                                  }}
                                  isInitialDisabled={step === 'clipboard-27'}
                                />
                              </div>
                            </div>
                          </motion.aside>

                          <section className="pinned-bottom-panel">
                            {step.startsWith('clipboard') ? (
                              <p className="flex w-full items-center justify-center p-3">
                                {cms.fillClipboard}
                              </p>
                            ) : (
                              <>
                                <div className="flex w-full flex-row items-center justify-center gap-4 lg:w-[unset] lg:gap-16">
                                  {isQ27Asked && isQ28Asked ? (
                                    <ProcessIchiroButton
                                      onClick={processIchiro}
                                    />
                                  ) : (
                                    <>
                                      <Tooltip
                                        content={`Question 27: ${cms.q27}`}
                                      >
                                        <Button
                                          onClick={goToQ27}
                                          disabled={isQ27Asked}
                                        >
                                          {isQ27Asked
                                            ? 'Question 27 Answered'
                                            : 'Ask Question 27'}
                                        </Button>
                                      </Tooltip>

                                      <Tooltip
                                        content={`Question 28: ${cms.q28}`}
                                      >
                                        <Button
                                          onClick={goToQ28}
                                          disabled={isQ28Asked}
                                        >
                                          {isQ28Asked
                                            ? 'Question 28 Answered'
                                            : 'Ask Question 28'}
                                        </Button>
                                      </Tooltip>
                                    </>
                                  )}

                                  {!hasChatBudget && <TranscriptDialogButton />}
                                </div>

                                {hasChatBudget && (
                                  <div className="flex w-full items-center gap-4 lg:max-w-[var(--usualMaxWidth)] lg:gap-8">
                                    <AutoExpandingTextArea
                                      label="Custom message for Ichiro. Please note that hitting ENTER will submit the form."
                                      onSubmit={({ aetextarea }) => {
                                        goToQCustom(aetextarea);
                                      }}
                                      placeholder="Type something to say to Ichiro"
                                    />

                                    <TranscriptDialogButton />
                                  </div>
                                )}
                              </>
                            )}
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
                          setStep('clipboard-27');
                        }}
                      />
                    )}

                    {step === 'q28' && (
                      <Q28
                        setTranscript={setTranscript}
                        setIchiroVariant={setIchiroVariant}
                        onComplete={() => {
                          setIchiroVariant('neutral');
                          setStep('clipboard-28');
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

                          if (hasChatBudget) {
                            return setStep('0.1');
                          }

                          /*** ************************ ***/
                          /*** Out of chat budget ***/

                          // No questions asked
                          if (!isQ27Asked && !isQ28Asked) {
                            setTranscript((prev) => [
                              ...prev,
                              { origin: 'ichiro', message: cms['2.3'] },
                            ]);
                            setStep('2.3');
                            return;
                          }

                          // Some question asked
                          if (!isQ27Asked || !isQ28Asked) {
                            setStep('0.1'); // budget is 0 so we just show the question buttons
                            return;
                          }

                          // All questions asked
                          return promptForcedProcessing();

                          /*** ************************ ***/
                        }}
                      />
                    )}

                    {step === 'prompt-process' && (
                      <>
                        {mostRecentTranscriptEntry && (
                          <TopPanel>
                            {mostRecentTranscriptEntry.origin === 'ichiro' ? (
                              <IchiroStatement>
                                {mostRecentTranscriptEntry.message}
                              </IchiroStatement>
                            ) : (
                              <UserStatement>
                                {mostRecentTranscriptEntry.message}
                              </UserStatement>
                            )}
                          </TopPanel>
                        )}

                        <div className="fixed inset-0 top-[unset]">
                          <section className="relative z-10 flex flex-col items-center gap-6 bg-darkBrownOverlay p-4 lg:gap-8 lg:px-16 lg:py-12">
                            <div className="flex w-full items-center justify-center gap-9 lg:w-[unset]">
                              <ProcessIchiroButton onClick={processIchiro} />

                              {!hasChatBudget && <TranscriptDialogButton />}
                            </div>

                            {hasChatBudget && (
                              <div className="flex w-full items-center gap-4 lg:max-w-[var(--usualMaxWidth)] lg:gap-8">
                                <AutoExpandingTextArea
                                  label="Custom message for Ichiro. Please note that hitting ENTER will submit the form."
                                  onSubmit={({ aetextarea }) => {
                                    goToQCustom(aetextarea);
                                  }}
                                  placeholder="Type something to say to Ichiro"
                                />

                                <TranscriptDialogButton />
                              </div>
                            )}
                          </section>
                        </div>
                      </>
                    )}

                    {step === 'process' && (
                      <>
                        <TopPanel>
                          <UserStatement>{cms.processIchiro}</UserStatement>
                        </TopPanel>

                        <motion.section
                          className="bottom-panel"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, delay: 1 }}
                        >
                          <IchiroStatement className="custom-scrollbar dismiss-ichiro-button">
                            {cms['0.3']}
                          </IchiroStatement>

                          <Link href="/experience/media/video-2">
                            <ContinueButton>
                              Dismiss
                              <br />
                              Ichiro
                            </ContinueButton>
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
