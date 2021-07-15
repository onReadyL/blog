/**
 *
 * @param {array} arr 目标列表
 * @param {string} id 父子关系id
 * @param {string} pId 父子关系pid
 * @param {string} children 树层级关系
 * @returns {array}
 */
const listToTree = (arr = [], id = 'id', pId = 'parentId', children = 'children') => {
	if (!arr || !arr.length) {
		return arr;
	}
	const map = new Map();
	const tree = [];
	for (let i = 0; i < arr.length; i++) {
		const ele = arr[i];
		map.set(ele[id], i);
	}
	for (let index = 0; index < arr.length; index++) {
		const ele = arr[index];
		if (map.has(ele[pId])) {
			const idx = map.get(ele[pId]);
			if (!arr[idx][children]) {
				arr[idx][children] = [ele];
			} else {
				arr[idx][children].push(ele);
			}
		} else {
			tree.push(ele);
		}
	}
	return tree;
};
