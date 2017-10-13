---
lang: ko
title: "LoopBack 3.0 - 한국"
layout: translation
trans_complete: true
toc: false
keywords: LoopBack 3.0
tags: [시작하기]
sidebar: lb3_sidebar
permalink: /doc/ko/lb3/index.html
summary: LoopBack 3.0이 현재 릴리즈 입니다.
---

{% include important.html content="LoopBack 3.0은 현재 제품의 릴리즈 이며, 2016년 12월 21일에 출시 되었습니다. 자세한 사항은 [릴리즈 발표](https://strongloop.com/strongblog/announcing-loopback-3-0-ga/)를 참고하세요. LoopBack 2.0은 [LTS 릴리즈](/doc/en/contrib/Long-term-support.html)로 전환 되었습니다.
" %}

## LoopBack 툴 설치하기

LoopBack 커멘드 라인 인터페이스(CLI) 툴을 설치하여 LoopBack 응용 프로그램을 만들고 수정하세요.

LoopBack CLI 툴을 설치하려면 다음 명령을 입력하세요:
```
npm install -g loopback-cli
```

보다 자세한 내용은 [설치](Installation)를 참고하세요.

## 기존에 설치한 StrongLoop를 3.0 버전으로 업그레이드 하기

기존에 설치한 StrongLoop를 업그레이드하는 방법은 [최신 버전으로 업데이트](Updating-to-the-latest-version.html)를 참고하세요.

## 기존 앱을 3.0 버전으로 마이그레이션 하기

LoopBack 3.0 업그레이드 지침은 [마이그레이션 가이드](Migrating-to-3.0.html)를 참조하세요.

[릴리즈 노트](3.0 릴리스 노트)는 2.x과 3.0 사이의 모든 변경 사항을 제공합니다.

## 시작하기

1. **[LoopBack 툴 설치하기](Installation)**.  
1. LoopBack을 사용하기 위해 알아야 할 주요 개념 학습을 위해 **[LoopBack 핵심 개념](LoopBack-core-concepts.html)**을 읽어보세요.
1. 빠른 자습서 소개 **[LoopBack 시작하기](Getting-started-with-LoopBack.html)**를 참고하세요.

LoopBack 사용에 대한 질문과 논의는 [LoopBack 개발자 포럼](https://groups.google.com/forum/#!forum/loopbackjs)을 확인하세요.

<div id="lb3apic" class="sl-hidden" markdown="1">
{% include note.html content ="[IBM API Connect](https://developer.ibm.com/apiconnect/) 은 LoopBack을 사용하여 API를 작성하고 통합 빌드 및 배치 도구를 제공하는 엔드-투-엔드 API 관리 솔루션입니다. 보다 자세한 내용은 [Installing IBM API Connect](Installing-IBM-API-Connect.html) 를 참고하세요.
" %}
</div>

**IBM 고객인 경우, 기술지원을 받으려면 [IBM Support Portal](http://www-01.ibm.com/support/docview.wss?uid=swg21593214)을 참고하세요.**

## LoopBack 프레임워크

LoopBack 프레임워크는 독립적으로 혹은 복합적으로 사용하여 REST API를 빠르게 빌드할 수 있는 Node.js 모듈입니다.

LoopBack 애플리케이션은 LoopBack 모델 API를 통해 데이터 소스와 상호 작용하며 Node.js 내에서 로컬로, [REST를 통한 원격](Built-in-models-REST-API)으로, [iOS, Android 및 HTML5](Client-SDKs)용 네이티브 클라이언트 API를 통해 상호 작용할 수 있습니다. 이러한 API를 사용하여 앱은 데이터베이스 쿼리, 데이터 저장, 파일 업로드, 이메일 보내기, 푸시 알림 생성, 사용자 등록 및 데이터 소스 및 서비스에서 제공하는 다른 작업 수행할 수 있습니다.     

클라이언트는 REST, WebSocket 및 기타 전송을 통해 백엔드 API를 제공 하는 장착형 전송계층인 [Strong Remoting](Strong-Remoting.html)을 사용하여 LoopBack API를 직접 호출 할 수 있습니다.

아래의 표는 주요 LoopBack 모듈과 모듈과의 관계 및 종속성을 보여줍니다.

{% include image.html file="9830413.png" alt="LoopBack modules" %}

### LoopBack 프레임워크 모듈

<table style="width: 1000px;">
  <thead>
    <tr>
      <th style="width: 80px;">카테고리</th>
      <th style="width:200px;">설명</th>
      <th>용도…</th>
      <th style="width: 280px;">모듈</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>모델</td>
      <td>모델과 API 서버</td>
      <td>동적으로 목업을 통한 모델을 만들고 지속성 가능한 API를 제공합니다.</td>
      <td>loopback</td>
    </tr>
    <tr>
      <td>추상화</td>
      <td>물리적 데이터에 대한 추상화 모델링</td>
      <td>다양한 데이터 소스나 서비스에 연결하고 백업 데이터 소스와 독립적인 CURD 기능으로 추상 모델을 복원합니다.</td>
      <td>loopback-datasource-juggler</td>
    </tr>
    <tr>
      <td>초기화</td>
      <td>어플리케이션 </td>
      <td>데이터 소스 설정, 사용자 정의 모델, 모델 구성 및 데이터 소스를 연결합니다; 응용 프로그램 설정 구성 및 사용자 지정 부팅 스크립트를 실행합니다.</td>
      <td>loopback-boot</td>
    </tr>
    <tr>
      <td>시퀀스</td>
      <td>미들웨어 실행</td>
      <td>애플리케이션 라이프 사이클 동안 다양한 시점에서 실행될 미들웨어를 구성합니다.</td>
      <td>loopback-phase</td>
    </tr>
    <tr>
      <td>Data</td>
      <td>RDBMS 및 NoSQL 물리적 데이터 소스</td>
      <td>RDBMS 및 NoSQL 데이터 소스에 대한 연결을 활성화하고 추상화 된 모델 제공합니다.</td>
      <td markdown="1">
- loopback-connector-mongodb
- loopback-connector-mysql
- loopback-connector-postgresql
- loopback-connector-msssql
- loopback-connector-oracle
- [그 외 다른것들...](Connectors-reference.html)
</td>
    </tr>
    <tr>
      <td>통합</td>
      <td>일반적인 시스템 연결</td>
      <td>일반적인 엔터프라이즈 및 웹 인터페이스를 통한 API를 제공하는 기존 시스템에 연결합니다.</td>
      <td markdown="1">
- loopback-connector-rest
- loopback-connector-soap
</td>
    </tr>
    <tr>
      <td>컴포넌트</td>
      <td>코어 LoopBack 부가기능 추가</td>
      <td>컴포넌트 내부에 패키지된 사전 구축 된 서비스와 통합 합니다.</td>
      <td markdown="1">
- loopback-component-push
- loopback-component-storage
- loopback-component-passport
</td>
    </tr>
    <tr>
      <td>클라이언트</td>
      <td>클라이언트 SDK</td>
      <td>REST를 통해 LoopBack API와 상호 작용하는 네이티브 플랫폼 객체 (iOS, Android, AngularJS)를 사용하여 클라이언트 응용 프로그램을 개발합니다.</td>
<td markdown="1">
- loopback-sdk-ios
- loopback-sdk-android
- loopback-sdk-angular
</td>
    </tr>
  </tbody>
</table>
