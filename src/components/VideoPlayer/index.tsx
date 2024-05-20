import classNames from 'classnames';
// import odd from "odd.player.js";
import type { ForwardRefRenderFunction } from 'react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import VideoJs from 'video.js';

// 视频播放方式
export enum EVideoType {
  // eslint-disable-next-line
  VideoJs = 'VideoJs',
  OddPlayerJs = 'OddPlayerJs',
}

type TPlayer = any;

export interface IVideoPlayerProps {
  className?: string;
  source: string;
  type?: EVideoType;
}

export interface IVideoPlayerImperativeHandles {
  getVideoPlayer: () => TPlayer;
  play: () => void;
  pause: () => void;
}

const VideoPlayer: ForwardRefRenderFunction<IVideoPlayerImperativeHandles, IVideoPlayerProps> = (
  { className, source, type = EVideoType.VideoJs }: IVideoPlayerProps,
  ref,
) => {
  const videoPlayer = useRef<TPlayer>();
  const videoPlayerNode = useRef<HTMLDivElement | null>(null);

  const getVideoPlayer = useCallback((): TPlayer => {
    if (!videoPlayer.current) {
      if (type === EVideoType.VideoJs) {
        videoPlayer.current = VideoJs('videoPlayer', {
          autoplay: false, // 设置自动播放
          muted: true, // 设置了它为true，才可实现自动播放,同时视频也被静音 （Chrome66及以上版本，禁止音视频的自动播放）
          preload: 'auto', // 预加载
          controls: true, // 显示播放的控件
        });
      } else {
        // videoPlayerNode.current.innerHTML = "";
        // videoPlayer.current = odd.player.ui.create({ mode: "file" });
        // videoPlayer.current.addGlobalListener(console.log);
        // videoPlayer.current.addEventListener("ready", () => {});
        // videoPlayer.current.addEventListener("click", () => {});
        // videoPlayer.current.addEventListener("screenshot", () => {});
        // videoPlayer.current.addEventListener("error", console.error);
        // videoPlayer.current.setup(videoPlayerNode.current, {
        //   autoplay: false,
        //   bufferLength: 0.5, // sec.
        //   lowlatency: true, // ll-dash, ll-hls, ll-flv/fmp4 (auto reduce latency due to cumulative ack of tcp)
        //   maxBufferLength: 1.5, // sec.
        //   maxRetries: 0, // maximum number of retries while some types of error occurs. -1 means always
        //   mode: "live", // live, vod
        //   module: "FLV", // SRC, FLV, FMP4, DASH*, HLS*, RTC
        //   objectfit: "contain", // fill, contain, cover, none, scale-down
        //   retrying: 0, // ms. retrying interval
        //   loader: {
        //     name: "auto",
        //     mode: "cors", // cors, no-cors, same-origin
        //     credentials: "omit", // omit, include, same-origin
        //   },
        //   plugins: [
        //     {
        //       kind: "Poster",
        //       // file: this.posterUrl,
        //       cors: "anonymous", // anonymous, use-credentials
        //       objectfit: "contain", // fill, contain, cover, none, scale-down
        //       visibility: true,
        //     },
        //     {
        //       kind: "Display",
        //       layout:
        //         "[Button:play=][Button:waiting=][Label:error=][Panel:info=][Panel:stats=]",
        //       ondoubleclick: "fullscreen",
        //       visibility: true,
        //     },
        //     {
        //       kind: "Controlbar",
        //       layout:
        //         "[Slider:timebar=Preview]|[Button:play=播放][Button:pause=暂停][Button:reload=重新加载][Button:stop=停止][Label:quote=Live][Label:time=00:00/00:00]||[Button:capture=截图][Button:mute=静音][Button:unmute=取消静音][Slider:volumebar=80][Select:definition=清晰度][Button:fullscreen=全屏][Button:exitfullscreen=退出全屏]",
        //       autohide: false,
        //       visibility: true,
        //     },
        //   ],
        // });
      }
    }

    return videoPlayer.current;
  }, [type]);

  /**
   * 继续播放
   */
  const onPlay = useCallback(() => {
    const player = getVideoPlayer();
    if (type === EVideoType.VideoJs) {
      player?.play();
    } else {
      player?.play(source);
    }
  }, [getVideoPlayer, type, source]);

  /**
   * 暂停播放
   */
  const onPause = useCallback(() => {
    const player = getVideoPlayer();
    if (type === EVideoType.VideoJs) {
      player?.pause();
    } else {
      player?.pause(source);
    }
  }, [getVideoPlayer, type, source]);

  /**
   * 导出方法
   */
  useImperativeHandle(
    ref,
    () => ({
      getVideoPlayer: getVideoPlayer,
      play: onPlay,
      pause: onPause,
    }),
    [getVideoPlayer, onPause, onPlay],
  );

  useEffect(() => {
    videoPlayer.current = getVideoPlayer();

    return () => {
      videoPlayer.current.dispose();
      videoPlayer.current = undefined;
    };
  }, []);

  useEffect(() => {
    const video = {
      withCredentials: false,
      type: 'application/x-mpegurl',
      src: source,
    };
    videoPlayer.current && videoPlayer.current.reset(); // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,

    if (videoPlayer.current && source) {
      videoPlayer.current.src(video);
    }
  }, [source]);

  return (
    <div className={classNames('relative', { [className]: className })}>
      {type === EVideoType.VideoJs ? (
        <video
          id="videoPlayer"
          className="video-js vjs-default-skin h-full w-full object-fill"
          controls
        />
      ) : (
        <div ref={videoPlayerNode} id="videoPlayer" className="h-full w-full object-fill" />
      )}
    </div>
  );
};

export default forwardRef(VideoPlayer);
