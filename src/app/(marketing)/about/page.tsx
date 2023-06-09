export default function Page() {
  return (
    <div className="typography-bio mx-auto flex h-full w-full max-w-[50ch] flex-col items-start justify-center gap-6 px-6 py-32">
      <h1 className="typography-title">About</h1>

      <p>
        &ldquo;Moment in Manzanar&rdquo; is an interactive educational film,
        featuring a conversational experience powered by a generative AI. The
        audience engages with &ldquo;Ichiro,&rdquo; a fictional Japanese
        American character representing the experience of incarceration in the
        Manzanar concentration camp during World War II. Ichiro is portrayed by
        a digital AI actor.
      </p>

      <p>
        Often, technology and entertainment cater to the interests of the
        majority for financial reasons. This approach tends to result in the
        creation of experiences that lack representation of diverse voices. For
        instance, many popular AI products exhibit a similar demographic in
        their voice, and numerous films feature a limited diversity in their
        cast. This project seeks to empower a historically marginalized Japanese
        American voice from the 1940s. Its goal is to demonstrate that
        technology can give voice to those who were historically voiceless in a
        compelling manner.
      </p>

      <p>
        It is important to clarify that &ldquo;Moment in Manzanar&rdquo; is a
        work of fiction and does not provide an accurate depiction of a specific
        moment in 1943. Instead, it aims to fill in the emotional gaps within
        the historical record. As John Okada, the author of &ldquo;No-No
        Boy,&rdquo; expressed in a letter to his publisher, “...only in fiction
        can the hopes and fears and joys and sorrows of people be adequately
        recorded.”
      </p>

      <p>
        History encompasses more than mere dates, numbers, and statistics—it is
        a human story filled with conversations and emotions. &ldquo;No-No
        Boy&rdquo; exemplifies a novel that effectively conveys the emotional
        aspects of the historical record and serves as a significant inspiration
        for this project. The main character in &ldquo;Moment in Manzanar&rdquo;
        shares the name with the protagonist of &ldquo;No-No Boy” for this
        reason.
      </p>

      <p>
        Published in 1957, &ldquo;No-No Boy&rdquo; by John Okada tells the story
        of a different Ichiro from the one encountered in &ldquo;Moment in
        Manzanar.&rdquo; The Ichiro in &ldquo;No-No Boy&rdquo; is a Japanese
        American who answered &ldquo;No&rdquo; to questions 27 and 28 of the
        loyalty questionnaire. These questions were as follows:
      </p>

      <ol className="typography-bio m-0 w-full max-w-[50ch] list-disc rounded-md border-[1px] border-dashed border-ichiro px-16 py-10">
        <li className="mb-6">
          Question 27: &ldquo;Are you willing to serve in the armed forces of
          the United States on combat duty, wherever ordered?&rdquo;
        </li>

        <li>
          Question 28: &ldquo;Will you swear unqualified allegiance to the
          United States of America and faithfully defend the United States from
          any and all attacks by foreign and domestic forces, and forswear any
          form of allegiance or disobedience to the Japanese Emperor, or any
          other foreign government, power, or organization?&rdquo;
        </li>
      </ol>

      <p className="pb-6">
        Responding &ldquo;No&rdquo; to both questions classified individuals as
        potential enemies of the state, leading to their confinement in
        maximum-security camps and social exclusion. Despite their significance
        and value, their voices were often overlooked. This project aims to
        empower these overlooked voices by facilitating a conversation between
        the audience and an AI actor portraying Ichiro. The hope is that this
        novel application of generative AI technology will convey at least a
        part of the emotional story from the past.
      </p>

      <p className="border-t-[1px] border-dashed border-ichiro pt-10 italic">
        This experience has been made possible by funding from the Inworld
        Character Grants.
      </p>

      <p className="italic">
        Photographs used in the experience courtesy of the National Archives and
        Records Administration, Library of Congress, National Park Service,
        California State University San Bernardino Special Collections &
        University Archives, The Frank Abe Collection, Center for Asian American
        Media, and Flikr Creative Commons Images.
      </p>
    </div>
  );
}
