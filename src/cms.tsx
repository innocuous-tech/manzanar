export const cms = {
  video1Url:
    'https://res.cloudinary.com/dprte0rm8/video/upload/v1686177039/v1_y86kvt.mp4',
  video2Url:
    'https://res.cloudinary.com/dprte0rm8/video/upload/v1686177054/v2_rtoruk.mp4',
  customQuestionBudget: 3,
  '0.0': `Hi. Let’s make this quick, alright?`,
  '0.2': `Look, I don’t want to waste time. I won’t risk my life for a country who took away my freedoms, and I will not forswear allegiance to an emperor I don’t even know. My answer is No and No. You know what you need to do.`,
  '0.3': `Thank you for your service, I guess. You are just doing your job right? Yeah, just like I was just being American my entire life. Have a good day.`,
  '1.0': `Hey, I’d love to spend more time chatting with you, but I’m a "No no". You know what you need to do.`,
  '2.3': `Can you stop wasting my time? Please just read out the question please.`,
  '2.4_yes27': `Hey. Give me that clipboard. My answer to question 27 isn’t "yes". I will not risk my life for a country that doesn’t value mine. It’s no.`,
  '2.4_yes28': `Are you kidding me? Give me that clipboard. My answer is no. I’m American. I can’t "forswear" allegiance to an emperor I’ve never sworn allegiance to.`,
  '2.6': `Oh, I guess you figured it out. Yeah, that’s right my answer is "No". I will not risk my life in combat for a country that doesn’t value mine.`,
  '2.7': `Yeah, mark me down as "No". It’s true, I won’t "forswear" my allegiance to the emperor...because I’ve never sworn allegiance!`,
  clipboard: `Please fill in Ichiro's answer on the clipboard.`,
  processIchiroButton: 'Process Ichiro',
  processIchiro: `Ichiro, I hereby declare you as a potential enemy of the state, and will be ordering you be sent to Tule Lake.`,
  q27: `Are you willing to serve on combat duty whenever ordered? Yes or no?`,
  q28: `Would you swear unqualified allegiance to the United States and forswear any form of allegiance to the Emperor of Japan? Yes or no?`,
  start: (
    <>
      {' '}
      This is <span className="inline text-ichiro">Ichiro</span>. Your job is to
      get his answers to question 27 and 28 of the loyalty questionnaire. And
      once you do, process him.{' '}
    </>
  ),
};
