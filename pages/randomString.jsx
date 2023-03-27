import {Input, Text, Button, Checkbox, Grid, Container, Row, Col, Card, Textarea} from "@nextui-org/react";
import React, {useState} from "react";
import {Layout} from "../components/Layout";


const CharCheckBox = ({selected, setSelected}) => (
    <Checkbox.Group
        orientation="horizontal"
        value={selected}
        onChange={setSelected}
    >
        <Checkbox value="lowerChar">小写字母a-z</Checkbox>
        <Checkbox value="upperChar">大写字母A-Z</Checkbox>
        <Checkbox value="intChar">数字0-9</Checkbox>
    </Checkbox.Group>);

export default function randomString() {
    const [randomText, setRandomText] = useState("");
    const [selected, setSelected] = useState(["lowerChar", "upperChar", "intChar"]);
    const [length, setLength] = useState("16");
    const generateRandomString = () => {

        let result = '';
        let chars = '';
        console.log(length)
        for (let selectedItem of selected) {
            if (selectedItem === 'intChar') {
                chars += "0123456789"
            } else if (selectedItem === 'lowerChar') {
                chars += "abcdefghijklmnopqrstuvwxyz"
            } else if (selectedItem === 'upperChar') {
                chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            } else {
                chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
            }
        }
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        setRandomText(result);
    };
    return (
        <Layout>
            <Grid.Container gap={1} justify="center">
                <Grid xs={10}>
                    <Card>
                        <Card.Header>
                            <Text h3>字符集范围</Text>
                        </Card.Header>
                        <Card.Body>
                            <CharCheckBox
                                selected={selected}
                                setSelected={setSelected}/>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={10}>
                    <Card>
                        <Card.Header>
                            <Text h3>字符串长度</Text>
                        </Card.Header>
                        <Card.Body>
                            <Input clearable bordered
                                   type="number"
                                   size="xl"
                                   initialValue={length}
                                   onChange={(e) => {
                                       setLength(e.target.value);
                                   }}/>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={10}>
                    <Button onPress={generateRandomString} size="xl">生成随机字符串</Button>
                </Grid>
                <Grid xs={10}>
                    <Card>
                        <Card.Body>
                            <Textarea
                                value={randomText}
                                minRows={20}
                                size="xl"
                            />
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    );
}