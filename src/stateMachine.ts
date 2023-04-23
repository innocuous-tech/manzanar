import { createMachine } from 'xstate';

export const stateMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFkCGA7AXh1AnAdADICCAcgCICiASgPoBqAkgMqMBChlAxAEZhQBLdPQEQwAewCMAbQAMAXUSgADuNgCALgPHolIAB6IAtAHZ8JgGwBmAEwAWABySAnFYCsDkybdWANCABPYytnB3w7WW9HB0jnEztLAF9E-zQsHAImKgB5WklaAAUSAE1GUgBxLgAzIQFYAAsRMSk5RSQQVXUtHT1DBFN8EItI2WdZGzdZFwT-IP6bWSt8G2cbCzs450lJDcjk1IxsdDx8LMpc-KLiUoquZVQAV1gwJokZBT1OzW1ddr6jGzxfDOCKWSa2SQWdazYw2Nb4Bw+eKyOxWTxuLb7EBpI4nZgAFWI1HxtGYAGFqJRKKQGCx2Jw7rg4LBmBo8BpWp81N8en9jJJliYHMK3JMHO5ZA4LA4Yf1JG5wrILCZbHZJFZlSZITYsTiMvgygTqABVMn4xjZUjMWmsDjcADGOhquAAtox0LANLgHvbuh7Oe0vn7esE7Pg3OqJiZZIsLJJRs5ZZIgcmIuMHBE40rdYd9QBFY2UAkWq02+ncWAPHguzR5h5wP0BlTc4N8hAhBUoyImVZWFVuGzuWVGeWK5Wq9Wa7U59LHAgFovmy3Wpi2hmV6u1+uen7SSRtZtdH4h9sLYGjbZrYYYuEWYfRhHpqV2NzDOJxme4ggAMUo+LJAASZTlLQZQAOrZNQhDkLQxAFIwXBgLguDiLgTYdC2x5ti+sjLCEGwWPYkwWImgSIGiYSOJIEwRtscQDp++q-v+QEVKBpAQVBMFwQhlb2vaYCQOhQZYaAfSvgKaLxnYjgmIO0ZuLKFHhE4NHbC43g6ik2K5nO+A0NQkG0MaCE1OgdT1MwyiCfa9TCZhvJiYgdhnhiIqyJMUZ+GRCBvvg1FrKEoyIq4JiMXpjCAYwhm0JSzAFMu3D6J6qAaGA+CoFUaW4AAFHFCVWpQAAE2TGviBRlUVVAlAAlFweoRVFMX5Yl9lHo5BiICCYRWC59jDNsiLbEpDjOMCqkbG4PZWDGdjhSckVAc1RYFcwSUpWlGVZUheUrYlJVlRV+JVZQtX1bpC1NbkLWFXuB4Ye1vxOQgcSUfY9jRhYbgbBssoyTY5ivp9clCoC82ZIwOR5IUxDGmt5B3AANqgASvC0HyBg5T2dfM0qDICCRTHGfZqsOfZjciwquGMCxwuD+DMPU4gAO5FQAOiABQoQJsCwEVjC2QIKEc0VzD2kyYDoIyzJc+IPOwAL9RC+IbU8tjfQ7FMyyIq+REJIRd4+RsY3rP9Dg2PGg5QnN2kNScZy5DYhQlMBdyPM8aM2KrrbPdRdgWAi4quLGckuMOo6Ziq9iTl4062xdENQ07BSw-DSMo573uiTjqwKr1oTUZKo0JIpPkjgqkcThqseEfTDu0MnLu3GZFmZxjh5qye8SUSDVgaiCGLOKRcw+MCUS2JEKwDc4yTaeg4hiPA7R27gXKPSeRh92YM09islhaq+Mpl6+Y0zaENiIhmXiuPTJAUDQZZ2mvndtgCAOgtfViSFKcZbIbcxGCoo+c+UIoTU0hHXSG5xoZXBuOUZ+PscYAgDkDXsqIYzODjEfABM0ljWAHGqNYV9er0wJESEk5JKTUkfpwBB2d-gbARD4BMGIRgZjsOHJU+BRgKV6gsSwX0bYHFnAtK0+ITRmhLCuOkT9Mbr1fo4cw+sFhqkmOqGSHCfLigRGqc+UYdjuEkPTBcxZlw0MoHQjqfQJhjVGJKXOqJ4jKlLnMVM-lkRxn9iEHYOx6bMSimxcCkFoKwXgpY9Wzk0TmC1GsewSpnBTUsLKC+SwXwfRcmMb+owrD0wMkZEy4STyojDBbC2HhrDrG-q+WUkwK7531qKHWFh6aLWitdPahVCltjkgHLwhiRSWBfCNSiql3BTUlPESBUNLip0oOQLpz0ASjUGLEPeyp5TSjJosfA+CL6LGIt4LwpCmasw5rLeW-NBbCxAKLcWglsYiSsYgS2Y0pTJh7IRIug4akeXCPUsEHhRQJCmdAxu1xgILJxvGEi-lCKHzkiCTRI8lj0SGOMPe2xvogsdjDOGczIUa0iAKKUh9c7gl6sObRqwpieBmtRXqyZSFFlYJaWg1J5lyJfs9OSCogoDm+mmHYSLggokDvyqauwYxuFnokIAA */
  id: 'Manzanar',
  initial: 'LANDER_VISIBLE',
  states: {
    LANDER_VISIBLE: {
      on: {
        beginVideo1: {
          target: 'VIDEO_1_PLAYING',
        },
      },
    },

    VIDEO_1_PLAYING: {
      on: {
        finishVideo1: {
          target: 'START_SCREEN_VISIBLE',
        },
        pauseVideo1: {
          target: 'VIDEO_1_PAUSED',
        },
      },
    },

    START_SCREEN_VISIBLE: {
      on: {
        pressStart: {
          target: 'INSTRUCTIONS_VISIBLE',
        },
      },
    },

    INSTRUCTIONS_VISIBLE: {
      on: {
        confirmInstructions: {
          target: 'QUESTIONS_VISIBLE',
        },
      },
    },

    QUESTIONS_VISIBLE: {
      on: {
        submitQuestion: [
          {
            target: 'FETCHING_INWORLD_API',
            cond: 'can ask question',
          },
          {
            target: 'QUESTIONS_VISIBLE',
            internal: false,
          },
        ],
      },
    },

    FETCHING_INWORLD_API: {
      on: {
        error: {
          target: 'ERROR_UI',
        },
        succeed: {
          target: 'ICHIRO_RESPONSE',
        },
      },
    },

    ERROR_UI: {
      on: {
        finishSpeech: {
          target: 'Show "Process Ichiro" Screen',
        },
      },
    },

    ICHIRO_RESPONSE: {
      after: {
        'RESPONSE OUTPUT DELAY': [
          {
            target: '#Manzanar.QUESTIONS_VISIBLE',
            cond: 'chat budget remains',
            actions: [],
            internal: false,
          },
          {
            target: '#Manzanar.Show "Process Ichiro" Screen',
            actions: [],
            internal: false,
          },
        ],
      },
    },

    VIDEO_1_PAUSED: {
      on: {
        playVideo1: {
          target: 'VIDEO_1_PLAYING',
        },
      },
    },

    'Show "Process Ichiro" Screen': {
      on: {
        pressProcessIchiro: {
          target: 'VIDEO_2_PLAYING',
        },
      },
    },

    VIDEO_2_PLAYING: {
      on: {
        pauseVideo2: {
          target: 'VIDEO_2_PAUSED',
        },

        finishVideo2: 'SESSION_END',
      },
    },

    VIDEO_2_PAUSED: {
      on: {
        playVideo2: {
          target: 'VIDEO_2_PLAYING',
        },
      },
    },

    SESSION_END: {
      type: 'final',
    },
  },
  schema: {
    events: {} as
      | { type: 'beginVideo1' }
      | { type: 'finishVideo1' }
      | { type: 'pressStart' }
      | { type: 'error' }
      | { type: 'succeed' }
      | { type: 'confirmInstructions' }
      | { type: 'pauseVideo1' }
      | { type: 'playVideo1' }
      | { type: 'submitQuestion' }
      | { type: 'pauseVideo2' }
      | { type: 'playVideo2' }
      | { type: 'pressProcessIchiro' }
      | { type: 'finishSpeech' },
  },
  predictableActionArguments: true,
  preserveActionOrder: true,
});
