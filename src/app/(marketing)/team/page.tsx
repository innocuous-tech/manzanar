import Image from 'next/image';
import { ReactComponent as InstagramIcon } from 'public/icons/instagram.svg';
import { ReactComponent as LinkedInIcon } from 'public/icons/linkedin.svg';
import { ReactComponent as TwitterIcon } from 'public/icons/twitter.svg';
import { ReactComponent as WebsiteIcon } from 'public/icons/website.svg';
import type { ReactElement } from 'react';

interface TeamMember {
  name: string;
  bio: ReactElement;
  socials: {
    linkedin?: {
      src: string;
      label: string;
    };
    twitter?: {
      src: string;
      label: string;
    };
    website?: {
      src: string;
      label: string;
    };
    instagram?: {
      src: string;
      label: string;
    };
  };
  imgSrc: string;
}

const team: TeamMember[] = [
  {
    name: 'Kent Morita',
    bio: (
      <>
        Kent is the producer and creator of &ldquo;Moment in Manzanar&rdquo;.
        They are also a conversation designer based in New York, who has worked
        on Google Assistant and Amazon Alexa.They are also an award-winning
        screenwriter, comedian, producer, and actor exploring the intersection
        of neurodiversity and Japanese-American identity, whose work you can
        find on Amazon Prime, The Onion, Clickhole, and Caveat.
      </>
    ),
    socials: {
      linkedin: {
        label: 'LinkedIn',
        src: 'https://www.linkedin.com/in/kentmorita',
      },
      instagram: {
        label: '@kent_morita',
        src: 'https://www.instagram.com/kent_morita',
      },
      website: {
        label: 'kentmorita.com',
        src: 'https://kentmorita.com/',
      },
    },
    imgSrc: '/images/team/kent.jpg',
  },
  {
    name: 'Ben White',
    bio: (
      <>
        Ben is a video editor and filmmaker based in New York. He hopes his work
        on &ldquo;Moment in Manzanar&rdquo; illuminates the crimes of the
        American government against Japanese-Americans during World War II. Ben
        has valued his time working on &ldquo;Moment in Manzanar&rdquo; as a way
        to deepen his own understanding of the heartless treatment of
        Japanese-Americans during this time period.
      </>
    ),
    socials: {
      website: {
        label: 'benwhitefilms.com',
        src: 'https://benwhitefilms.com',
      },
    },
    imgSrc: '/images/team/ben.jpg',
  },
  {
    name: 'Cindy Shin',
    bio: (
      <>
        Cindy is a product designer based in Brooklyn, NY. She joined the
        Project Manzanar team due to her deep interest in exploring narratives
        with a focus on social equity and underrepresented perspectives. Outside
        of her work as a designer, Cindy’s favorite things to do are wheel
        throwing ceramics, recommending new books to friends, and fostering
        rescue dogs.
      </>
    ),
    socials: {
      linkedin: {
        label: 'LinkedIn',
        src: 'https://www.linkedin.com/in/cindyseojungshin',
      },
      website: {
        label: 'cindyshin.com',
        src: 'https://www.cindyshin.com',
      },
    },
    imgSrc: '/images/team/cindy.jpg',
  },
  {
    name: 'Herrick Ong',
    bio: (
      <>
        Herrick is a game artist and illustrator based in the San Francisco Bay
        Area, with a lifelong passion for drawing and communicating ideas. His
        previous clients include, Crazy Maple Studio, Kongregate, Voltage
        Entertainment, 5 Color Combo, and more.
      </>
    ),
    socials: {
      linkedin: {
        label: 'LinkedIn',
        src: 'https://www.linkedin.com/in/herrick-ong-677a4550',
      },
      instagram: {
        label: '@stupjam',
        src: 'https://www.instagram.com/stupjam',
      },
      twitter: {
        label: '@stupjam',
        src: 'https://twitter.com/stupjam',
      },
    },
    imgSrc: '/images/team/herrick.jpg',
  },
  {
    name: 'Kyle Holmberg',
    bio: (
      <>
        Kyle tells people that he makes &ldquo;pretty web things&rdquo; for
        work. His career involves building features and design systems at Nike,
        Acorns, and Capsule (among others). When he’s not coding, he spends his
        time traveling the world with his fiancé, playing video games, and
        watching Arsenal—his favorite team—disappoint him in new and creative
        ways.
      </>
    ),
    socials: {
      linkedin: {
        label: 'LinkedIn',
        src: 'https://www.linkedin.com/in/kylemh',
      },
      website: {
        label: 'kylemh.com',
        src: 'https://www.kylemh.com/',
      },
      twitter: {
        label: '@kylemh_',
        src: 'https://twitter.com/kylemh_',
      },
    },
    imgSrc: '/images/team/kyle.jpg',
  },
];

export default function Page() {
  return (
    <div className="h-full w-full px-8 py-32">
      <div className="mx-auto flex w-fit max-w-full flex-col items-start justify-center gap-6">
        <h1 className="typography-title">Team</h1>

        <ul className="flex flex-col gap-24 lg:gap-28">
          {team.map((member, index) => (
            <li key={member.name} className="flex flex-wrap gap-6 lg:gap-10">
              <Image
                src={member.imgSrc}
                width={234}
                height={234}
                priority={index === 0 || index === 1}
                alt=""
                className="h-[234px] w-[234px]"
              />

              <article className="flex max-w-[calc(100vw-4rem)] flex-col gap-4 lg:gap-6">
                <h2 className="typography-body">{member.name}</h2>

                <p className="typography-bio max-w-[50ch]">{member.bio}</p>

                <ul className="flex flex-wrap gap-6">
                  {Object.entries(member.socials).map(([key, value]) => (
                    <li
                      key={`${member.name}_${key}`}
                      className="typography-social inline-flex items-center gap-2 [&>svg]:h-6 [&>svg]:w-6"
                    >
                      {key === 'instagram' && <InstagramIcon />}
                      {key === 'linkedin' && <LinkedInIcon />}
                      {key === 'twitter' && <TwitterIcon />}
                      {key === 'website' && <WebsiteIcon />}

                      <a href={value.src} target="_blank" rel="noreferrer">
                        {value.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
