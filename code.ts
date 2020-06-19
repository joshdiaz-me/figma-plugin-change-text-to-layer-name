const selection = figma.currentPage.selection;
let numTextLayers = 0;

if (selection.length > 0) {
  selection.forEach(async node => {
    if (node.type === 'TEXT') {
      numTextLayers++;
      await figma.loadFontAsync(node.fontName as FontName);
      node.characters = node.name;
      node.autoRename = true;
    }
  });
  if (numTextLayers === 0) {
    figma.closePlugin('🚫 Select a text layer');
  } else if (numTextLayers === 1) {
    figma.closePlugin('✅ ' + numTextLayers + ' text layer changed');
  } else {
    figma.closePlugin('✅ ' + numTextLayers + ' text layers changed');
  }
} else {
  figma.closePlugin('🚫 Make a selection');
}