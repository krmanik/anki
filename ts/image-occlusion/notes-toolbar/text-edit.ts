let show = false;

export const changePreviewHTMLView = () => {
    let id = "";
    let codeTextArea = "img-occ-html-";
    let preview = "img-occ-preview-";

    let activeElement = document.activeElement!;
    if (!activeElement.id.includes("img-occ-")) {
        return;
    }

    show = !show;

    if (activeElement.id.includes(codeTextArea)) {
        id = activeElement.id.split(codeTextArea)[1];
    }

    if (activeElement.id.includes(preview)) {
        id = activeElement.id.split(preview)[1];
    }

    let codeTextAreaElement = document.getElementById(codeTextArea + id)! as HTMLTextAreaElement;
    let previewElement = document.getElementById(preview + id)!;

    if (show) {
        previewElement.style.display = "none";
        codeTextAreaElement.style.display = "block";
        codeTextAreaElement.value = previewElement.innerHTML;
        codeTextAreaElement.focus();
    } else {
        codeTextAreaElement.style.display = "none";
        previewElement.style.display = "block";
        previewElement.innerHTML = codeTextAreaElement.value;
        previewElement.focus();
    }
};