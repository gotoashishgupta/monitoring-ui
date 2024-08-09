import React, { useEffect, memo, useState } from "react";
import { ITask } from "#wf-local/store/index";
import { Flex, Progress, Spin, Tabs, Typography, Layout, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useThemeToken } from '#wf-local/theme/hooks';

const { Text } = Typography;
const {Content} = Layout;

type LogsContainerProp = {
  tasks: ITask[],
  milestone: string;
}


const LogsContainer: React.FC<LogsContainerProp> = memo(({tasks, milestone} : LogsContainerProp) => {
  const { colorBgContainerDisabled, colorTextSecondary } = useThemeToken();

  return (
    <Flex vertical className="flex h-full w-full">
      <Typography.Title level={4}>{milestone}</Typography.Title>
      <div className="">
          <Tabs
            defaultActiveKey="1"
            tabPosition="top"
            className="flex w-full h-full"
            items={
              tasks.map((task, index) => {
                let progress: React.ReactElement = <></>
                switch(task.statusString) {
                  case 'pending':
                    progress = <span className={`w-4 h-4 rounded-full bg-gray-300`}></span> //<Progress type="circle" percent={0} size={24} />
                    break;
                  case 'skipped':
                    progress =  <span className={`w-4 h-4 rounded-full bg-gray-600`}></span>
                    break;
                  case 'in-progress':
                    progress = <Spin indicator={<LoadingOutlined spin />} size="small"/>
                    break;
                  case 'failed':
                    progress = <Progress type="circle" status="exception" size={24} />
                    break;
                  case 'completed':
                    progress = <Progress type="circle" percent={100} size={24}/>
                    break;
                }

                let promptTemplate:React.ReactElement = <></>
                if(task?.input) {
                  promptTemplate = (
                    <Col span={24} flex="auto" className="mb-4 rounded-lg p-4" style={{ backgroundColor: colorBgContainerDisabled }}>
                      <Typography.Title level={5}>Prompt</Typography.Title>
                      <Typography.Text>{('' + task?.input).replace("\n", "<br/>")}</Typography.Text>
                    </Col>
                  )
                }
              return {
                label: (
                    <Flex className="flex gap-4" align="center" key={index}>
                      {progress}
                      <Text strong>{task.task}</Text>
                    </Flex>
                ),
                key: '' + index,
                children: (
                  <Row>
                      {promptTemplate}
                      <Col span={24} className="p-4 rounded-lg shadow-md bg-black">
                        <pre className="flex w-full h-[calc(100vh-24rem)] whitespace-pre-wrap font-mono text-sm text-white">
                          {task.output || "NA" }
                        </pre>
                      </Col>
                  </Row>
                )
              }
          })}
          />

      </div>

    </Flex>
  );
});

export default LogsContainer;
