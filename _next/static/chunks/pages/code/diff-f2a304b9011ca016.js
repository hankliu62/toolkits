(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8154],{62703:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/code/diff",function(){return t(26790)}])},26790:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return u}});var s=t(52676),a=t(30453),i=t(39253),o=t.n(i),l=t(61759),r=t(5638),c=t(80090),d=t(93482),x=t(80487),m=t(75271),p=function(e){let{diffDataList:n,isUseUi:t,id:a,title:i,icon:o,headerExtraRender:p,...u}=e,[h,v]=(0,m.useState)(""),[f,y]=(0,m.useState)(u.outputFormat||"line-by-line");return(0,m.useEffect)(()=>{let e=[];for(let t of n){let{fileName:n,oldHeader:s,newHeader:a,prevData:i,newData:o,isJson:l,isYaml:d}=t,m=i||"",p=o||"";d?(m=x.ZP.dump(i),p=x.ZP.dump(o)):l&&(m=JSON.stringify(i,null,2),p=JSON.stringify(o,null,2));let u=[n||"",m,p,s||"",a||"",{context:99999}],h=(0,r.rh)(...u),v=(0,c.Qc)(h);e.push(v[0])}if(t){let n=document.getElementById(a),t={...u,drawFileList:!0,matching:"lines",highlight:!0,outputFormat:f},s=new d.ae(n,e,t);s.draw(),s.highlightCode(),s.fileListToggle(!!t.fileListToggle)}else v((0,c.dy)(e,{...u,drawFileList:!1,matching:"lines",outputFormat:f}))},[n,a,t,u,f]),(0,s.jsxs)("div",{children:[(0,s.jsxs)("div",{className:"flex items-center justify-between rounded-tl-[4px] rounded-tr-[4px] border border-[#d8d8d8] bg-[#eff4f9] p-3",children:[(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"mr-2 last:mr-0 empty:hidden",children:o}),(0,s.jsx)("div",{className:"mr-2 text-sm last:mr-0 empty:hidden",children:i}),(0,s.jsx)("div",{className:"mr-2 text-sm last:mr-0",children:(0,s.jsxs)(l.ZP.Group,{value:f,onChange:e=>y(e.target.value),children:[(0,s.jsx)(l.ZP.Button,{value:"line-by-line",children:"Inline"}),(0,s.jsx)(l.ZP.Button,{value:"side-by-side",children:"Side-by-side"})]})})]}),(0,s.jsx)("div",{className:"empty:hidden",children:p&&p()})]}),t?(0,s.jsx)("div",{id:a||"code-diff-ui"}):(0,s.jsx)("div",{id:"code-diff",dangerouslySetInnerHTML:{__html:h}})]})};function u(){return(0,s.jsxs)("div",{className:"bg-white pb-6",children:[(0,s.jsx)(a.Z,{className:"!m-6",items:[{title:(0,s.jsx)(o(),{href:"/",children:"小工具集合"})},{title:"内容差异"}]}),(0,s.jsx)("div",{className:"px-6",children:(0,s.jsx)(p,{title:"配置文件",diffDataList:[{prevData:"kind: Deployment\napiVersion: apps/v1\nmetadata:\n  name: xxxxxx\n  namespace: xxx-dev\n  labels:\n    app: xxxxxx\n  annotations:\n    deployment.kubernetes.io/revision: '21'\n    timeout: '5'\n    updated: '2023-03-07 15:48:37'\n    username: xxx\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: xxxxxx\n      version: base\n  template:\n    metadata:\n      creationTimestamp: null\n      labels:\n        ASM_TRAFFIC_TAG: version-base\n        app: xxxxxx\n        ccc: '666'\n        version: base\n      annotations:\n        c100: k600\n    spec:\n      volumes:\n        - name: v1\n          emptyDir: {}\n        - name: v2\n          hostPath:\n            path: /home/test\n            type: ''\n        - name: v3\n          configMap:\n            name: oasis-mysql-config\n            items:\n              - key: mysql-conf\n                path: my.cnf\n            defaultMode: 420\n        - name: v4\n          secret:\n            secretName: git-xxxxxx\n            defaultMode: 420\n      containers:\n        - name: xxxxxx\n          image: 'dockerhub.xxxxxx.com/devops/xxxxxx/test:20230307154807832'\n          command:\n            - nginx\n            - ' -g '\n            - daemon off;\n          ports:\n            - name: http-0\n              containerPort: 80\n              protocol: TCP\n          env:\n            - name: gecc\n              value: EN$(merge)\n            - name: ENV\n              value: test\n            - name: VERSION\n              value: base\n            - name: APP_NAME\n              value: xxxxxx\n            - name: abc\n              value: '234'\n          resources:\n            limits:\n              cpu: '2'\n              memory: 1Gi\n            requests:\n              cpu: 100m\n              memory: 100Mi\n          livenessProbe:\n            httpGet:\n              path: /\n              port: 80\n              scheme: HTTP\n            initialDelaySeconds: 10\n            timeoutSeconds: 1\n            periodSeconds: 10\n            successThreshold: 1\n            failureThreshold: 3\n          readinessProbe:\n            tcpSocket:\n              port: 80\n            initialDelaySeconds: 10\n            timeoutSeconds: 1\n            periodSeconds: 10\n            successThreshold: 1\n            failureThreshold: 3\n          lifecycle:\n            postStart:\n              exec:\n                command:\n                  - /bin/sh\n                  - ' -c '\n                  - echo 123\n            preStop:\n              exec:\n                command:\n                  - /bin/sh\n                  - ' -c '\n                  - sleep 2\n          terminationMessagePath: /dev/termination-log\n          terminationMessagePolicy: File\n          imagePullPolicy: Always\n      restartPolicy: Always\n      terminationGracePeriodSeconds: 30\n      dnsPolicy: ClusterFirst\n      nodeSelector:\n        devops: privileged\n      securityContext: {}\n      imagePullSecrets:\n        - name: registry-key\n      schedulerName: default-scheduler\n      tolerations:\n        - key: devops-privileged\n          operator: Exists\n          effect: NoSchedule\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxUnavailable: 25%\n      maxSurge: 25%\n  revisionHistoryLimit: 10\n  progressDeadlineSeconds: 600\n",newData:"kind: Deployment\napiVersion: apps/v1\nmetadata:\n  name: xxxxxx\n  namespace: xxx-dev\n  labels:\n    app: xxxxxx\n  annotations:\n    deployment.kubernetes.io/revision: '21'\n    timeout: '5'\n    updated: '2023-03-07 17:32:37'\n    username: xxx\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: xxxxxx\n      version: base\n  template:\n    metadata:\n      creationTimestamp: null\n      labels:\n        ASM_TRAFFIC_TAG: version-base\n        app: xxxxxx\n        ccc: '666'\n        version: base\n      annotations:\n        c100: k600\n    spec:\n      volumes:\n        - name: v1\n          configMap:\n            name: oasis-mysql-config\n            items:\n              - key: mysql-conf\n                path: my.cnf\n            defaultMode: 420\n        - name: v2\n          hostPath:\n            path: /home\n            type: ''\n      containers:\n        - name: xxxxxx\n          image: 'dockerhub.xxxxxx.com/devops/xxxxxx/test:20230307154807832'\n          command:\n            - nginx\n            - '-g'\n            - daemon off;\n          ports:\n            - name: http-0\n              containerPort: 80\n              protocol: TCP\n          env:\n            - name: gecc\n              value: EN$(merge)\n            - name: ENV\n              value: test\n            - name: VERSION\n              value: base\n            - name: APP_NAME\n              value: xxxxxx\n            - name: abc\n              value: '123'\n            - name: cbx\n              value: '234'\n          resources:\n            limits:\n              cpu: '1'\n              memory: 1Gi\n            requests:\n              cpu: 100m\n              memory: 100Mi\n          livenessProbe:\n            httpGet:\n              path: /\n              port: 80\n              scheme: HTTP\n            initialDelaySeconds: 10\n            timeoutSeconds: 1\n            periodSeconds: 10\n            successThreshold: 1\n            failureThreshold: 3\n          readinessProbe:\n            tcpSocket:\n              port: 80\n            initialDelaySeconds: 10\n            timeoutSeconds: 1\n            periodSeconds: 10\n            successThreshold: 1\n            failureThreshold: 3\n          lifecycle:\n            postStart:\n              exec:\n                command:\n                  - /bin/sh\n                  - '-c'\n                  - echo 123\n            preStop:\n              exec:\n                command:\n                  - /bin/sh\n                  - '-c'\n                  - sleep 2\n          terminationMessagePath: /dev/termination-log\n          terminationMessagePolicy: File\n          imagePullPolicy: Always\n      restartPolicy: Always\n      terminationGracePeriodSeconds: 30\n      dnsPolicy: ClusterFirst\n      nodeSelector:\n        devops: privileged\n      securityContext: {}\n      imagePullSecrets:\n        - name: registry-key\n      schedulerName: default-scheduler\n      tolerations:\n        - key: devops-privileged\n          operator: Exists\n          effect: NoSchedule\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxUnavailable: 25%\n      maxSurge: 25%\n  revisionHistoryLimit: 10\n  progressDeadlineSeconds: 600\n"}],icon:(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"h-4 w-4",children:[(0,s.jsx)("path",{d:"M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"}),(0,s.jsx)("path",{fillRule:"evenodd",d:"M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z",clipRule:"evenodd"}),(0,s.jsx)("path",{d:"M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"})]}),headerExtraRender:()=>(0,s.jsx)("span",{className:"text-xs",children:"与上一个记录 #28 (585f876) 对比"})})})]})}}},function(e){e.O(0,[4683,9581,7931,2412,9286,2141,7451,8193,487,1759,7744,2888,9774,179],function(){return e(e.s=62703)}),_N_E=e.O()}]);