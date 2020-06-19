var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const selection = figma.currentPage.selection;
let numTextLayers = 0;
if (selection.length > 0) {
    selection.forEach((node) => __awaiter(this, void 0, void 0, function* () {
        if (node.type === 'TEXT') {
            numTextLayers++;
            yield figma.loadFontAsync(node.fontName);
            node.characters = node.name;
            node.autoRename = true;
        }
    }));
    if (numTextLayers === 0) {
        figma.closePlugin('🚫 Select a text layer');
    }
    else if (numTextLayers === 1) {
        figma.closePlugin('✅ ' + numTextLayers + ' text layer changed');
    }
    else {
        figma.closePlugin('✅ ' + numTextLayers + ' text layers changed');
    }
}
else {
    figma.closePlugin('🚫 Make a selection');
}
