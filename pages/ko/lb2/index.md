---
title: "LoopBack - 한국어"
layout: translation
sidebar: ko_lb2_sidebar
lang: ko
tags:
permalink: /doc/ko/lb2/index.html
summary: 한국어로 문서를 번역 도와주세요.
---

{% include important.html content="LoopBack을 처음 사용할 경우에는 현재 릴리스를 사용하십시오.,
[LoopBack 3.0](/doc/en/lb3/index.html).
" %}

LoopBack 사용에 대한 질문과 논의는 [LoopBack 개발자 포럼](https://groups.google.com/forum/#!forum/loopbackjs)을 확인하세요.

{% include note.html content ="[IBM API Connect](https://developer.ibm.com/apiconnect/)는 LoopBack을 사용하여 API를 작성하고, 통합 빌드 및 배치 도구를 제공하는 end-to-end API 관리 솔루션입니다. 자세한 정보는 [Installing IBM API Connect](Installing-IBM-API-Connect.html)를 참조하세요.

**IBM 고객인 경우, 기술지원을 받으려면 [IBM Support Portal](http://www-01.ibm.com/support/docview.wss?uid=swg21593214)을 참고하세요.**
"%}

## LoopBack 프레임워크

LoopBack 프레임워크는 독립적으로 혹은 복합적으로 사용하여 REST API를 빠르게 빌드할 수 있는 Node.js 모듈입니다.

LoopBack 애플리케이션은 LoopBack 모델 API를 통해 데이터 소스와 상호 작용하며 Node.js 내에서 로컬로, [REST를 통한 원격](Built-in-models-REST-API)으로, [iOS, Android 및 HTML5](Client-SDKs)용 네이티브 클라이언트 API를 통해 상호 작용할 수 있습니다. 이러한 API를 사용하여 앱은 데이터베이스 쿼리, 데이터 저장, 파일 업로드, 이메일 보내기, 푸시 알림 생성, 사용자 등록 및 데이터 소스 및 서비스에서 제공하는 다른 작업 수행할 수 있습니다.

Clients can call LoopBack APIs directly using Strong Remoting, a pluggable transport layer that enables you to provide backend APIs over REST, WebSockets, and other transports.

클라이언트는 REST, WebSocket 및 기타 전송을 통해 백엔드 API를 제공 하는 장착형 전송계층인 [Strong Remoting](Strong-Remoting.html)을 사용하여 LoopBack API를 직접 호출 할 수 있습니다.

아래의 표는 주요 LoopBack 모듈과 모듈과의 관계 및 종속성을 보여줍니다.

{% include image.html file="9830413.png" alt="LoopBack 모듈" %}

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
- [Many others...](Connectors-reference.html)
</td>
    </tr>
    <tr>
      <td>통합</td>
      <td>일반적인 시스템 연결</td>
      <td>일반적인 엔터프라이즈 및 웹 인터페이스를 통한 API를 제공하는 기존 시스템에 연결합니다.
      </td>
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
