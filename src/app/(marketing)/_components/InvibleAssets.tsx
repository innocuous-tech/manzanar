/* eslint-disable @next/next/no-img-element */

/** We do this so assets are fetched and cached immediately instead of loaded upon demand. */
export const InvibleAssets = () => (
  <>
    <video disablePictureInPicture className="hidden">
      <source
        src="https://res.cloudinary.com/dprte0rm8/video/upload/v1685475768/v1_ojzsa5.mp4"
        type="video/mp4"
      />
    </video>

    <img src="/images/ichiro/draft1.png" alt="" className="hidden" />
    <img src="/images/ichiro/draft2.png" alt="" className="hidden" />
    <img src="/images/ichiro/draft3.png" alt="" className="hidden" />
    <img src="/images/ichiro/draft4.png" alt="" className="hidden" />
    <img src="/images/ichiro/draft5.png" alt="" className="hidden" />
    <img src="/images/ichiro/draft6.png" alt="" className="hidden" />
    <img src="/images/ichiro/draft7.png" alt="" className="hidden" />
    <img src="/images/ichiro/draft8.png" alt="" className="hidden" />
  </>
);
