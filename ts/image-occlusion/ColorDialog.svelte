<script lang="ts">
    import { getAnswerMaskColor, getQuestionMaskColor } from "./tools/lib";
    import * as tr from "@tslib/ftl";
    import Row from "../components/Row.svelte";
    import Col from "../components/Col.svelte";

    export let top;

    const setColor = (type: string, e: any) => {
        localStorage.setItem(type, e.target.value);
    };
</script>

<div style="top: {top}px" class="color-dialog">
    <Row --cols={2}>
        <Col --col-size={1}>
            <label for="ques-color">{tr.editingQuestionMaskColor()}</label>
        </Col>
        <Col --col-size={1}>
            <input
                type="color"
                id="ques-color"
                value={getQuestionMaskColor()}
                on:change={(e) => setColor("ques-color", e)}
            />
        </Col>
    </Row>
    <Row --cols={2}>
        <Col --col-size={1}>
            <label for="ans-color">{tr.editingAnswerMaskColor()}</label>
        </Col>
        <Col --col-size={1}>
            <input
                type="color"
                id="ans-color"
                value={getAnswerMaskColor()}
                on:change={(e) => setColor("ans-color", e)}
            />
        </Col>
    </Row>
</div>

<style lang="scss">
    .color-dialog {
        display: flex;
        flex-direction: column;
        position: fixed;
        z-index: 1;
        left: 40px;
        overflow: auto;
        background: white;
        padding: 16px;
    }
</style>
