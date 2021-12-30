const changeText = async (textNodes) => {
  for (const node of textNodes) {
    await figma.loadFontAsync(node.fontName as FontName);
    node.characters = node.name;
    node.autoRename = true;
  }

  return Promise.resolve();
}

// runtime code
const run = async () => {
  const selection = figma.currentPage.selection;
  const textNodes = selection.filter(node => node.type === 'TEXT');
  const mixedTextNodes = textNodes.filter(textNode => textNode.fontName.description === 'figma.mixed');
  if (!selection.length) figma.closePlugin('🚫 Make a selection');
  if (mixedTextNodes.length > 0) figma.closePlugin('🚫 Text layers cannot contain mixed font styles');
  if (!textNodes.length) {
    figma.closePlugin('🚫 Select a text layer');
    return;
  }
  await changeText(textNodes);
  figma.closePlugin(`✅ ${textNodes.length} text layer${textNodes.length === 1 ? '' : 's'} changed`)

}

run();