import {Box, Layout} from "../components/Layout";
import React, {useState} from "react";
import {Input, Text, Button, Checkbox, Grid, Container, Row, Col, Card, Textarea} from "@nextui-org/react";
import {error} from "next/dist/build/output/log";

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function Home() {
    const [strValue, setStrValue] = useState("");
    const [jsonValue, setJsonValue] = useState("");
    const convertJsonStr = () => {
        try {
            let tmpJson = JSON.parse(strValue);
            setJsonValue(JSON.stringify(tmpJson, undefined,  "\t"))
        } catch(error){
            alert(error)
        }

    };
    return (
        <Layout>
            <Grid.Container gap={2} justify="center" css={{ mt: "4px" }} >
                <Grid xs={5}>
                    <Textarea bordered
                              width={"100%"}
                              minRows={25}
                              maxRows={100}
                              onChange={(e) => {
                                  let tmpValue = e.target.value.replace(/'/g,"");
                                  setStrValue(tmpValue);
                              }}/>
                </Grid>
                <Grid xs={2} justify="center">
                    <Button size="sm" onPress={convertJsonStr}>格式化</Button>
                </Grid>
                <Grid xs={5}>
                    <Textarea
                        value={jsonValue}
                      bordered
                      width={"100%"}
                      minRows={25}
                      maxRows={100}/>
                </Grid>
            </Grid.Container>
        </Layout>
    );
}

export default Home