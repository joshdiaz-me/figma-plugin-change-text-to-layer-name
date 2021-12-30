var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const changeText = (textNodes) => __awaiter(this, void 0, void 0, function* () {
    for (const node of textNodes) {
        yield figma.loadFontAsync(node.fontName);
        node.characters = node.name;
        node.autoRename = true;
    }
    return Promise.resolve();
});
// runtime code
const run = () => __awaiter(this, void 0, void 0, function* () {
    const selection = figma.currentPage.selection;
    const textNodes = selection.filter(node => node.type === 'TEXT');
    const mixedTextNodes = textNodes.filter(textNode => textNode.fontName.description === 'figma.mixed');
    if (!selection.length)
        figma.closePlugin('🚫 Make a selection');
    if (mixedTextNodes.length > 0)
        figma.closePlugin('🚫 Text layers cannot contain mixed font styles');
    if (!textNodes.length) {
        figma.closePlugin('🚫 Select a text layer');
        return;
    }
    yield changeText(textNodes);
    figma.closePlugin(`✅ ${textNodes.length} text layer${textNodes.length === 1 ? '' : 's'} changed`);
});
run();
