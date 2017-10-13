---
title: 설치하기
layout: translation
trans_complete: true
lang: ko
keywords: LoopBack
tags: [설치하기]
sidebar: lb3_sidebar
permalink: /doc/ko/lb3/Installation.html
summary: LoopBack CLI 도구를 설치하여 LoopBack 3.0 응용프로그램을 생성하고 개발하십시오.
---

이론적으로는, 처음부터 LoopBack 애플리케이션을 코딩 할 수 있지만, LoopBack CLI 툴을 설치하면 시작하기가 훨씬 쉬워집니다.
사용자의 요구에 맞게 사용자 정의 할 수 있는 응용 프로그램의 발판이 됩니다. 보다 자세한 내용은 [커멘드 라인 툴](Command-line-tools.html) 을 참고하세요.

<div id="lb3apic" class="sl-hidden" markdown="1">
LoopBack 도구에는 두 가지 옵션이 있습니다.:

- **[IBM API 커넥트 개발 툴킷 설치하기](Installing-IBM-API-Connect.html)**에 포함되어 있는 것:
  - LoopBack 응용 프로그램을 만들고 수정할 때 사용할 수 있는 그래픽 _API Designer_ 도구입니다.
  - LoopBack 애플리케이션의 발판을 만들고 수정하기 위한 `apic` 커멘드 라인 툴.
</div>

## 전제 조건: Node.js 설치하기
Node를 설치하지 않았다면 [Node.js를 다운로드하여 설치](http://nodejs.org/en/download)하세요. 최상의 결과를 얻기 위해서는 Node.js의 최신 LTS(장기지원) 릴리즈를 사용하세요.

{% include warning.html content="LoopBack은 Node.js 4.x 이전의 버젼은 지원하지 않습니다.
" %}

## LoopBack CLI 툴 설치하기

LoopBack 커멘드 라인 인터페이스 (CLI) 툴을 설치하려면 다음의 명령을 실행하세요:

```
npm install -g loopback-cli
```
위의 명령을 통해 LoopBack 응용 프로그램의 기반과 수정하기 위한 lb 커멘드 라인 툴이 설치됩니다.
자세한 내용은 [커멘드 라인 툴](Command-line-tools.html)을 참고하세요.

## 다음

[LoopBack 시작하기](Getting-started-with-LoopBack.html)와 [LoopBack 핵심 개념](LoopBack-core-concepts)을 읽어 보세요.
