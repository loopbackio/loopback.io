---
title: 설치하기
lang: ko
keywords: LoopBack
tags: [installation]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Installation.html
summary: Install the LoopBack CLI tool to create and develop LoopBack 3.0 apps.
---

Although in theory, you could code a LoopBack
application from scratch, installing the LoopBack CLI tool makes it much easier to get
started.  It will scaffold an application that you can then customize to suit
your needs.  For more information, see [Command-line tools](Command-line-tools.html).


<div id="lb3apic" class="sl-hidden" markdown="1">
You have two options for LoopBack tools:

- **[Install IBM API Connect developer toolkit](Installing-IBM-API-Connect.html)**, which includes:
  - The graphical _API Designer_ tool that you can use to create and modify LoopBack applications.
  - The `apic` command-line tool for scaffolding and modifying LoopBack applications.
</div>

## 전제 조건: Node.js 설치하기
Node를 설치하지 않았따면 [Node.js를 다운로드하여 설치](http://nodejs.org/en/download)하세요. 최상의 결과를 얻기 위해서는 Node.js의 최신 LTS(장기지원) 릴리즈를 사용하세요.

{% include warning.html content="LoopBack은 Node.js 4.x 이전의 버젼은 지원하지 않습니다." %}

## LoopBack CLI 툴 설치하기

LoopBack 커멘드 라인 인터페이스 (CLI) 툴을 설치하려면 다음의 명령을 실행하세요:

```
npm install -g loopback-cli
```
위의 명령을 통해 LoopBack 응용 프로그램의 기반과 수정하기 위한 lb 커멘드 라인 툴이 설치됩니다. 
자세한 내용은 [커멘드 라인 툴](Command-line-tools.html)을 참고하세요. 

## 다음 

[LoopBack 시작하기](Getting-started-with-LoopBack.html)와 [LoopBack 핵심 개념](LoopBack-core-concepts)을 읽어 보세요.
