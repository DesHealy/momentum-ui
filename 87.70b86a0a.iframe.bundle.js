(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{804:function(module,exports){module.exports=function jbossCli(hljs){var PARAMSBLOCK={className:"params",begin:/\(/,end:/\)/,contains:[{begin:/[\w-]+ *=/,returnBegin:!0,relevance:0,contains:[{className:"attr",begin:/[\w-]+/}]}],relevance:0};return{name:"JBoss CLI",aliases:["wildfly-cli"],keywords:{$pattern:"[a-z-]+",keyword:"alias batch cd clear command connect connection-factory connection-info data-source deploy deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue|20 jms-topic|20 ls patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias undeploy unset version xa-data-source",literal:"true false"},contains:[hljs.HASH_COMMENT_MODE,hljs.QUOTE_STRING_MODE,{className:"params",begin:/--[\w\-=\/]+/},{className:"function",begin:/:[\w\-.]+/,relevance:0},{className:"string",begin:/\B([\/.])[\w\-.\/=]+/},PARAMSBLOCK]}}}}]);