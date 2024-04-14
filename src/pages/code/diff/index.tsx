import DiffCode from "@/components/DiffCode";
import { getRoutePrefix } from "@/utils/route";
import { Breadcrumb } from "antd";
import Link from "next/link";

// 对比老字符串
const prevData = `kind: Deployment
apiVersion: apps/v1
metadata:
  name: xxxxxx
  namespace: xxx-dev
  labels:
    app: xxxxxx
  annotations:
    deployment.kubernetes.io/revision: '21'
    timeout: '5'
    updated: '2023-03-07 15:48:37'
    username: xxx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: xxxxxx
      version: base
  template:
    metadata:
      creationTimestamp: null
      labels:
        ASM_TRAFFIC_TAG: version-base
        app: xxxxxx
        ccc: '666'
        version: base
      annotations:
        c100: k600
    spec:
      volumes:
        - name: v1
          emptyDir: {}
        - name: v2
          hostPath:
            path: /home/test
            type: ''
        - name: v3
          configMap:
            name: oasis-mysql-config
            items:
              - key: mysql-conf
                path: my.cnf
            defaultMode: 420
        - name: v4
          secret:
            secretName: git-xxxxxx
            defaultMode: 420
      containers:
        - name: xxxxxx
          image: 'dockerhub.xxxxxx.com/devops/xxxxxx/test:20230307154807832'
          command:
            - nginx
            - ' -g '
            - daemon off;
          ports:
            - name: http-0
              containerPort: 80
              protocol: TCP
          env:
            - name: gecc
              value: EN$(merge)
            - name: ENV
              value: test
            - name: VERSION
              value: base
            - name: APP_NAME
              value: xxxxxx
            - name: abc
              value: '234'
          resources:
            limits:
              cpu: '2'
              memory: 1Gi
            requests:
              cpu: 100m
              memory: 100Mi
          livenessProbe:
            httpGet:
              path: /
              port: 80
              scheme: HTTP
            initialDelaySeconds: 10
            timeoutSeconds: 1
            periodSeconds: 10
            successThreshold: 1
            failureThreshold: 3
          readinessProbe:
            tcpSocket:
              port: 80
            initialDelaySeconds: 10
            timeoutSeconds: 1
            periodSeconds: 10
            successThreshold: 1
            failureThreshold: 3
          lifecycle:
            postStart:
              exec:
                command:
                  - /bin/sh
                  - ' -c '
                  - echo 123
            preStop:
              exec:
                command:
                  - /bin/sh
                  - ' -c '
                  - sleep 2
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          imagePullPolicy: Always
      restartPolicy: Always
      terminationGracePeriodSeconds: 30
      dnsPolicy: ClusterFirst
      nodeSelector:
        devops: privileged
      securityContext: {}
      imagePullSecrets:
        - name: registry-key
      schedulerName: default-scheduler
      tolerations:
        - key: devops-privileged
          operator: Exists
          effect: NoSchedule
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 25%
      maxSurge: 25%
  revisionHistoryLimit: 10
  progressDeadlineSeconds: 600
`;
// 对比新字符串
const newData = `kind: Deployment
apiVersion: apps/v1
metadata:
  name: xxxxxx
  namespace: xxx-dev
  labels:
    app: xxxxxx
  annotations:
    deployment.kubernetes.io/revision: '21'
    timeout: '5'
    updated: '2023-03-07 17:32:37'
    username: xxx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: xxxxxx
      version: base
  template:
    metadata:
      creationTimestamp: null
      labels:
        ASM_TRAFFIC_TAG: version-base
        app: xxxxxx
        ccc: '666'
        version: base
      annotations:
        c100: k600
    spec:
      volumes:
        - name: v1
          configMap:
            name: oasis-mysql-config
            items:
              - key: mysql-conf
                path: my.cnf
            defaultMode: 420
        - name: v2
          hostPath:
            path: /home
            type: ''
      containers:
        - name: xxxxxx
          image: 'dockerhub.xxxxxx.com/devops/xxxxxx/test:20230307154807832'
          command:
            - nginx
            - '-g'
            - daemon off;
          ports:
            - name: http-0
              containerPort: 80
              protocol: TCP
          env:
            - name: gecc
              value: EN$(merge)
            - name: ENV
              value: test
            - name: VERSION
              value: base
            - name: APP_NAME
              value: xxxxxx
            - name: abc
              value: '123'
            - name: cbx
              value: '234'
          resources:
            limits:
              cpu: '1'
              memory: 1Gi
            requests:
              cpu: 100m
              memory: 100Mi
          livenessProbe:
            httpGet:
              path: /
              port: 80
              scheme: HTTP
            initialDelaySeconds: 10
            timeoutSeconds: 1
            periodSeconds: 10
            successThreshold: 1
            failureThreshold: 3
          readinessProbe:
            tcpSocket:
              port: 80
            initialDelaySeconds: 10
            timeoutSeconds: 1
            periodSeconds: 10
            successThreshold: 1
            failureThreshold: 3
          lifecycle:
            postStart:
              exec:
                command:
                  - /bin/sh
                  - '-c'
                  - echo 123
            preStop:
              exec:
                command:
                  - /bin/sh
                  - '-c'
                  - sleep 2
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          imagePullPolicy: Always
      restartPolicy: Always
      terminationGracePeriodSeconds: 30
      dnsPolicy: ClusterFirst
      nodeSelector:
        devops: privileged
      securityContext: {}
      imagePullSecrets:
        - name: registry-key
      schedulerName: default-scheduler
      tolerations:
        - key: devops-privileged
          operator: Exists
          effect: NoSchedule
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 25%
      maxSurge: 25%
  revisionHistoryLimit: 10
  progressDeadlineSeconds: 600
`;

/**
 * 代码差异对比页面
 * @returns
 */
export default function Diff() {
  return (
    <div className="bg-white pb-6">
      <Breadcrumb
        className="!m-6"
        items={[
          {
            title: <Link href={getRoutePrefix() + "/"}>小工具集合</Link>,
          },
          {
            title: "内容差异",
          },
        ]}
      />

      <div className="px-6">
        <DiffCode
          title="配置文件"
          diffDataList={[
            {
              prevData: prevData,
              newData: newData,
            },
          ]}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
              <path
                fillRule="evenodd"
                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                clipRule="evenodd"
              />
              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
            </svg>
          }
          headerExtraRender={() => (
            <span className="text-xs">与上一个记录 #28 (585f876) 对比</span>
          )}
        />
      </div>
    </div>
  );
}
