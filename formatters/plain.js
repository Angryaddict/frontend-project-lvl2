export default function plain(tree) {
  const iter = (interTree, acc) => {
    const result = interTree
      .map((node) => {
        if ('children' in node) {
          return `${iter(node.children, `${acc}${node.name}.`)}`;
        }
        if (node.status === 'changed') {
          return `Property '${acc}${node.name}' was updated. From '${node.oldValue}' to '${node.value}'`;
        }
        if (node.status === 'deleted') {
          return `Property '${acc}${node.name}' was removed`;
        }
        if (node.status === 'added') {
          return `Property '${acc}${node.name}' was added with value: '${node.value}'`;
        }
        return undefined;
      })
      .filter((node) => node !== undefined)
      .join('\n');
    return result.replace("'[object Object]'", '[complex value]').replace("'false'", 'false').replace("'true'", 'true').replace("'null'", 'null');
  };
  return iter(tree, '');
}
