// Вспомогательные функции для будущей визуализации графов
export const flattenTree = (nodes = []) => {
  return nodes.reduce((acc, node) => {
    acc.push(node);
    if (node.children) {
      acc.push(...flattenTree(node.children));
    }
    return acc;
  }, []);
};
