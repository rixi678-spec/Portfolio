# SHULI · 张树理视觉作品集

React + Vite + GSAP + Hls.js。包含电影感背景、个人介绍与简历、8个 AI 影像项目（9部影片）、5个游戏与舞台场景概念项目。

## 本地运行

使用 Node.js 22：

```sh
npm ci
npm run dev
```

AI 视频使用独立的 HLS 文件。先构建页面，再准备影片：

```sh
npm run build
npm run prepare:videos
npm run preview
```

`media-manifest.json` 记录330个影片文件的大小及SHA-256校验值。准备脚本从现有公开作品集的只读媒体接口取得原画质文件，写入 `dist/media`。最终发布的 GitHub Pages 页面和视频在同一域名下播放，不依赖访客跨域加载影片。构建过程需要原媒体源保持可访问。

也可设置 `LOCAL_VIDEO_DIRECTORY` 使用本地 HLS 素材目录；如迁移视频源，可设置 `VIDEO_SOURCE_ORIGIN`。所有视频均保持原有分辨率与码率，不重新压缩。

## GitHub Pages

仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。推送 `main` 会自动构建并发布。

目标地址：`https://rixi678-spec.github.io/Portfolio/`。

工作流设置 `SITE_BASE_PATH=/Portfolio/`，同时处理 JSX、项目数据、海报和视频的资源路径。改仓库名称时，应同步修改工作流中的路径。

视频不存放在 Git 历史中。部署时校验并下载，约860MB；整站接近1GB，新增大型素材时需留意 GitHub Pages 的站点大小限制。

## 内容维护

- `src/projects.json`：AI 影片介绍、集数、截图。
- `src/main.jsx`：个人介绍、简历、导航和全局交互。
- `src/legacy/`：游戏与舞美项目、商业主视觉及古城星语分层排版。
- `public/assets/`、`public/media/`：图片、字体、背景视频和简历。

本仓库只包含前端、展示素材及部署工作流，不包含原站的私有素材上传后台或登录凭据。
