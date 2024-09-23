# Awesome Video Resources

[![build](https://travis-ci.org/sitkevij/awesome-video.svg?branch=master)](https://travis-ci.org/sitkevij/awesome-video)
[![Awesome](https://awesome.re/badge-flat.svg)](https://awesome.re)

A curated list of awesome video frameworks, libraries, specifications and software.

## Contributing

Please take a look at the [contribution guidelines](https://github.com/sitkevij/awesome-video/blob/master/CONTRIBUTING.md) first. Thanks to all [contributors](https://github.com/sitkevij/awesome-video/graphs/contributors).

- [AR/VR/360](#arvr360)
- [Captions and Subtitles](#captions-and-subtitles)
- [Conferences](#conferences)
- [Conferencing](#conferencing)
- [Learning Resources](#learning-resources)
- [Players](#players)
- [Language and platform specific libraries](#language-and-platform-specific-libraries)
  - [iOS Swift](#ios-swift)
  - [Javascript](#javascript)
  - [Go](#go)
  - [Python](#python)
  - [Rust](#rust)
- [Metadata](#metadata)
- [Media Processing](#media-processing)

## Analysis tools

- [bitrate-plotter](https://github.com/CrypticSignal/bitrate-plotter) - Plots a graph showing the bitrate every second or the bitrate of every GOP.
- [MpegTsAnalyzer](https://github.com/small-teton/MpegTsAnalyzer) - Analyzer of MPEG2 Transport Stream.
- [QCtools](https://github.com/bavc/qctools) - Quality Control Tools for Video Preservation, helps users to analyze and understand digitized video files.
- [tsduck](https://github.com/tsduck/tsduck) - MPEG Transport Stream Toolkit.
- [tstools](https://github.com/OlivierLeBozec/tstools) - Display PCR, DTS, PTS, bitrate, jitter of a mpeg TS.
- [videobench](https://github.com/JNoDuq/videobench) - VMAF PSNR Bitrate Analyzer.
- [vivict](https://github.com/SVT/vivict) - In-browser tool for subjective comparison of the visual quality of different encodings.
- [VTCLab Media Analyzer](https://media-analyzer.pro) - In-browser tool that helps to analyze the internal structure of MPEG-TS and MP4/MOV files.
- [YUView](https://github.com/IENT/YUView) - The Free and Open Source Cross Platform YUV Viewer with an advanced analytics toolset.
- [plot-av](https://github.com/wangyoucao577/plot-av)  - Plot Audio/Video streams for better insights.


## AR/VR/360

- [ARVideoKit](https://github.com/AFathi/ARVideoKit) - Capture & record ARKit videos, photos, live photos, and GIFs.
- [kaleidoscope](https://github.com/thiagopnts/kaleidoscope) - An embeddable, lightweight 360º video/image viewer.

## Captions and Subtitles

- [vtt.js](https://github.com/mozilla/vtt.js) - A JavaScript implementation of the WebVTT specification.
- [WebVTT](https://www.w3.org/TR/webvtt1/) - WebVTT W3C 'Web Video Text Tracks Format' specification.

## Conferences

- [Demuxed](http://demuxed.com) - The conference and community for developers working with video.

## Conferencing

- [Jitsi Meet](https://github.com/jitsi/jitsi-meet) - Secure, Simple and Scalable Video Conferences that you use as a standalone app or embed in your web application.

## Learning Resources

- [digital video introduction](https://github.com/leandromoreira/digital_video_introduction) - A hands-on introduction to video technology: image, video, codec (av1, vp9, h265) and more (ffmpeg encoding).
- [ffmpeg encoding course](https://github.com/slhck/ffmpeg-encoding-course) - An introduction to FFmpeg and its tools.
- [List of Streams](https://github.com/bengarney/list-of-streams) - Community list of public test streams for HLS and DASH.
- [Live Stream from Desktop](https://github.com/leandromoreira/live-stream-from-desktop) - Provide guidance to test live streaming (mpeg-dash or hls) or vod from your desktop
- [Streaming Onboarding](https://github.com/Eyevinn/streaming-onboarding) - New to streaming and don't know where to start? This is the place for you!.

## Players

- [bigscreen-player](https://github.com/bbc/bigscreen-player) - Simplify video and audio playback on a wide range of 'bigscreen' devices (TVs, set-top boxes, games consoles, and streaming devices).
- [chimee](https://github.com/Chimeejs/chimee) - A video player framework aims to bring wonderful experience on browser.
- [clappr](https://github.com/clappr/clappr) - An extensible media player for the web.
- [epic-video-comparator](https://github.com/epiclabs-io/epic-video-comparator) - Javascript library which implements a video comparator component: two overlaped and synchronized video players each one playing an independent source.
- [ExoPlayer](https://github.com/google/ExoPlayer) - An extensible media player for Android.
- [hls.js](https://github.com/video-dev/hls.js) - JavaScript HLS client using Media Source Extension (MSE).
- [dash.js](https://github.com/Dash-Industry-Forum/dash.js) - JavaScript DASH client using Media Source Extension (MSE).
- [iina](https://github.com/lhc70000/iina) - The modern video player for macOS.
- [ijkplayer](https://github.com/Bilibili/ijkplayer) - Android/iOS video player based on FFmpeg n3.4, with MediaCodec, VideoToolbox support.
- [indigo-player](https://github.com/matvp91/indigo-player) - Highly extensible, modern, JavaScript video player. Handles MPEG-Dash / HLS / MPEG-4 and is built on top of the HTML5 video element.
- [mobileplayer-ios](https://github.com/mobileplayer/mobileplayer-ios) - A powerful and completely customizable media player for iOS.
- [mpv](https://github.com/mpv-player/mpv) - Video player based on MPlayer/mplayer2.
- [ngx-videogular](https://github.com/videogular/ngx-videogular) - The HTML5 video player for Angular 2 and successor to videogular2.
- [openplayerjs](https://github.com/openplayerjs/openplayerjs) - Lightweight HTML5 video/audio player with smooth controls and ability to play VAST/VPAID/VMAP ads.
- [plyr](https://github.com/sampotts/plyr) - A simple HTML5, YouTube and Vimeo player.
- [replay](https://github.com/vimond/replay) - A React video player facilitating adaptive stream playback with custom UI and a React-friendly API.
- [shaka-player](https://github.com/google/shaka-player) - JavaScript player library / DASH client / MSE-EME player.
- [Video.js](https://github.com/videojs/video.js) - open source HTML5 & Flash video player.
- [vlc](https://github.com/videolan/vlc) - VLC media player.

## Language and platform specific libraries

### iOS Swift

- [FFmpeg-iOS-build](https://github.com/kewlbear/FFmpeg-iOS-build-script) - Shell scripts to build FFmpeg for iOS and tvOS.
- [PBJVision](https://github.com/piemonte/PBJVision) - iOS Media Capture – features touch-to-record video, slow motion, and photography.

### Javascript

- [channel-engine](https://github.com/Eyevinn/channel-engine) - VOD to Live Engine Library.
- [jMuxer](https://github.com/samirkumardas/jmuxer) - A simple javascript mp4 muxer for non-standard streaming communications protocol.
- [ffmpeg.js](https://github.com/Kagami/ffmpeg.js) - Javascript FFmpeg bindings, port of FFmpeg with Emscripten.
- [remotion](https://github.com/remotion-dev/remotion) - Create Videos programmatically with React
- [Revideo](https://github.com/redotvideo/revideo) - A Typescript framework for programmatic video creation & editing.

### Python

- [atvk](https://github.com/senko/avtk) - Audio/Video toolkit for Python.
- [brave](https://github.com/bbc/brave) - Basic Real-time AV Editor - allowing you to preview, mix, and route live audio and video streams on the cloud.
- [dash-live-source-simulator](https://github.com/Dash-Industry-Forum/dash-live-source-simulator) - DASH live source simulator providing reference live content.
- [django-video-encoding](https://github.com/escaped/django-video-encoding) - django-video-encoding helps to convert your videos into different formats and resolutions.
- [ffmpeg-python](https://github.com/kkroening/ffmpeg-python) - Python bindings for FFmpeg - with complex filtering support.
- [ffmpy](https://github.com/Ch00k/ffmpy) - Pythonic interface for FFmpeg/FFprobe command line.
- [hls-analyzer](https://github.com/epiclabs-io/hls-analyzer) - Analyzer for HTTP Live Streams (HLS) content.
- [hls-relay](https://github.com/Eyevinn/hls-relay) - Script to pull HLS stream from one origin and push to another origin.
- [hls-to-dash](https://github.com/Eyevinn/hls-to-dash) - Open source packager and tools to rewrap live HLS to live MPEG DASH.
- [m3u8](https://github.com/globocom/m3u8) - Python m3u8 Parser for HTTP Live Streaming (HLS) Transmissions.
- [moviepy](https://github.com/Zulko/moviepy) - Video editing with Python.
- [objective_perceptual_analysis](https://github.com/crunchyroll/objective_perceptual_analysis) - Objective Perceptual Analysis, Compression Karma Predictor.
- [PyAV](https://github.com/mikeboers/PyAV) - Pythonic bindings for FFmpeg's libraries.
- [pycaption](https://github.com/pbs/pycaption) - Python module to read/write popular video caption formats.
- [pychromecast](https://github.com/balloob/pychromecast) - Library for Python 3 to communicate with the Google Chromecast.
- [PyLivestream](https://github.com/scivision/PyLivestream) - Simple cross-platform FFmpeg-based live streaming to YouTube, Periscope, Twitch, Facebook Live and more.
- [python-video-converter](https://github.com/senko/python-video-converter) - Python Video Converter (ffmpeg wrapper).
- [vidgear](https://github.com/abhiTronix/vidgear) - High-performance cross-platform Video Processing Python framework powerpacked with unique trailblazing features.
- [vod-to-live](https://github.com/Eyevinn/vod-to-live) - A python library to generate Live HLS from VOD.
- [webm.py](https://github.com/Kagami/webm.py) - Encode WebM videos.

### Go

- [gmf](https://github.com/3d0c/gmf) - Go bindings for FFmpeg av\* libraries.
- [goffmpeg](https://github.com/xfrr/goffmpeg) - FFMPEG wrapper written in GO.
- [go-astisub](https://github.com/asticode/go-astisub) - Manipulate subtitles in GO (.srt, .stl, .ttml, .webvtt, .ssa/.ass, teletext, .smi, etc.).
- [go-astits](https://github.com/asticode/go-astits) - Parse and demux MPEG Transport Streams (.ts) natively in GO.
- [goav](https://github.com/giorgisio/goav) - Comphrensive Go bindings for FFmpeg.
- [gst](https://github.com/ziutek/gst) - Go bindings for GStreamer.
- [libgosubs](https://github.com/wargarblgarbl/libgosubs) - Subtitle format support for go. Supports .srt, .ttml, and .ass.
- [libvlc-go](https://github.com/adrg/libvlc-go) - Go bindings for libVLC 2.X/3.X/4.X and high-level media player interface.
- [v4l](https://github.com/korandiz/v4l) - Video capture library for Linux, written in Go.
- [snickers](http://github.com/snickers/snickers) - An open source alternative to the video cloud encoding services.

### Rust

- [mp4parse-rust](https://github.com/mozilla/mp4parse-rust) - Parser for ISO Base Media Format aka video/mp4 written in Rust.

## Metadata

- [mpi](https://github.com/sitkevij/mpi) - Rust-based MPEG-4 box inspector with TOML output.
- [photon](https://github.com/Netflix/photon) - Java implementation of the SMPTE standard, Interoperable Master Format (IMF).

## Media Processing

- [Av1an](https://github.com/master-of-zen/Av1an) - About Cross-platform command-line AV1 / VP9 / HEVC / H264 / VVC encoding framework with per scene quality encoding.
- [Bento4](https://github.com/axiomatic-systems/Bento4) - Full-featured MP4 format and MPEG DASH library and tools.
- [easyVmaf](https://github.com/gdavila/easyVmaf) -Python script to easily compute VMAF using FFmpeg. It allows to deinterlace, scale and sync Ref and Distorted video automatically.
- [FFmpeg](http://ffmpeg.org) - A complete, cross-platform solution to record, convert and stream audio and video.
- [ffmpeg-explorer](https://github.com/antiboredom/ffmpeg-explorer/) - Interactive FFMPEG Command Generator.
- [Flowblade](https://github.com/jliljebl/flowblade) - Video editor for Linux.
- [fluster](https://github.com/fluendo/fluster) - Testing framework for decoders conformance.
- [gifify](https://github.com/vvo/gifify) - Convert any video file to an optimized animated GIF.
- [hlstools](https://github.com/muxinc/hlstools/) - Tools for analyzing and processing hls streams.
- [lossless-cut](https://github.com/mifi/lossless-cut) - Cross platform GUI tool for lossless trimming / cutting of video and audio files using ffmpeg.
- [MLT](https://github.com/mltframework/mlt) - MLT Multimedia Framework.
- [moviepy](https://github.com/Zulko/moviepy) - Video editing with Python.
- [multistreamer](https://github.com/jprjr/multistreamer) - A webapp for publishing video to multiple streaming services at once.
- [nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module) - NGINX-based Media Streaming Server.
- [nginx-vod-module](https://github.com/kaltura/nginx-vod-module) - NGINX-based MP4 Repackager.
- [ott-packager](https://github.com/cannonbeach/ott-packager) - OTT streaming packager supporting ABR streaming for DASH and HLS.
- [PHP-FFmpeg-video-streaming](https://github.com/aminyazdanpanah/PHP-FFmpeg-video-streaming) - Package media content for online streaming(DASH and HLS) using FFmpeg.
- [QtAV](https://github.com/wang-bin/QtAV) - A cross-platform multimedia framework based on Qt and FFmpeg.
- [qtlmovie](https://github.com/qtlmovie/qtlmovie) - A specialized Qt frontend for FFmpeg and other free media tools.
- [shaka-packager](https://github.com/google/shaka-packager) - A media packaging and development framework for VOD and Live DASH and HLS applications, supporting Common Encryption for Widevine and other DRM Systems.
- [SVT-AV1](https://github.com/OpenVisualCloud/SVT-AV1) - Scalable Video Technology AV1 encoder.
- [SVT-HEVC](https://github.com/OpenVisualCloud/SVT-HEVC) - Scalable Video Technology HEVC encoder.
- [SVT-VP9](https://github.com/OpenVisualCloud/SVT-VP9) - Scalable Video Technology VP9 encoder.
- [vpp](https://github.com/matt-42/vpp) - Video++, a C++14 high performance video and image processing library.
- [video-transcoding-api](https://github.com/NYTimes/video-transcoding-api) - Agnostic API to transcode media assets across different cloud services.
- [video-thumbnail-generator](https://github.com/flavioribeiro/video-thumbnail-generator) - Generate thumbnail sprites from videos.

