import React from 'react';

class SkyFury extends React.Component {
  constructor(props) {
    super(props);
    this.player = null;
  }

  componentDidMount() {
    // Load the YouTube player API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Define onYouTubeIframeAPIReady function
    window.onYouTubeIframeAPIReady = this.createPlayer;
  }

  createPlayer = () => {
    // Create the YouTube player
    this.player = new window.YT.Player('skyFury', {
      events: {
        // Optional: Add any player events here
      }
    });
  }

  playVideo = () => {
    if (this.player) {
      this.player.playVideo();
    }
  }
  playVideo
  
  render() {
    return (
      <div>
        <iframe id="skyFury" className="responsive-iframe" src="https://www.youtube.com/embed/sPLcIvNWsQE?si=3xeDkVLacBkr0tkS&amp;autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    );
  }
}

export default SkyFury;