import {Button, Card, Grid, Input, Text, Textarea} from "@nextui-org/react";
import {Layout} from "../components/Layout";
import React, {useState} from "react";
type HighlightProps = {
  text: string,
  pattern: RegExp | string,
  flag?: string,
  matchClassName?: string,
  matchStyle?: { [key: string]: string }
}
/**
 * 高光组件
 * @param text {string} 文本
 * @param pattern { string | null| RegExp } 匹配单词/正则
 * @param flag 正则匹配模式
 * @param matchClassName 匹配文本class
 * @param style 匹配文本样式
 */
const WithHighlight = ({
                         text = '',
                         pattern = '',
                         flag = 'ig',
                         matchClassName = 'kg-highlight',
                         matchStyle = {}
}: HighlightProps) => {
  if (!pattern) {
    return null;
  }

  const re = new RegExp(pattern, flag); // 基于关键字构造正则

  if (!re.test(text)) {
    return (
      <div>{text}</div>
    )
  }
  const splitter = '\u0001\u0003' //  使用的特殊字符作为分割标记
  const matchArray = text
    .replace(re, m=>`${splitter}${m}${splitter}`) // 将匹配到的文字使用特殊字符包裹
    .split(splitter)
    .filter(Boolean) // 处理关键字在起始位置的时候留下的空字符串（这里不处理也可以）
  return (
    <div>
      {
        matchArray.map(node => {
          if (!re.test(node)) {
            return node;
          }
          return <span className={matchClassName} style={matchStyle}>{node}</span>
        })
      }
    </div>
  )
};

export default function Re() {
    const [pattern, setPattern] = useState("");
    const [patternStr, setPatternStr] = useState("");
    const [matchStr, setMatchStr] = useState("");
    const [matchResult, setMatchResult] = useState("");
    const generateRandomString = () => {
            // let r=matchStr.replace(pattern,"<span class='highlight'>$1</span>");
            setMatchResult(matchStr);
            setPatternStr(pattern)
        };
    return (
        <Layout>
            <Grid.Container gap={1} justify="center">
                <Grid xs={10}>
                    <Card>
                        <Card.Header>
                            <Text h3>正则表达式</Text>
                        </Card.Header>
                        <Card.Body>
                            <Input clearable bordered
                                   size="xl"
                                   initialValue={pattern}
                                   onChange={(e) => {
                                       setPattern(e.target.value);
                                   }}/>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={10}>
                    <Card>
                        <Card.Header>
                            <Text h3>匹配字符串</Text>
                        </Card.Header>
                        <Card.Body>
                            <Input clearable bordered
                                   size="xl"
                                   initialValue={matchStr}
                                   onChange={(e) => {
                                       setMatchStr(e.target.value);
                                   }}/>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={10}>
                    <Button onPress={generateRandomString}  size="xl">匹配</Button>
                </Grid>
                <Grid xs={10}>
                    <Card>
                        <Card.Header>
                            <Text h3>匹配结果</Text>
                        </Card.Header>
                        <Card.Body>
                            <WithHighlight text={matchResult} pattern={patternStr} matchStyle={{ color: '#6ae', fontWeight: 'bold' }}/>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    );
}