const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootData = null;
  }

  root() {
    return this.rootData;
  }

  add(data) {
    this.rootData = addNode(this.rootData, data);

    function addNode(node, data) {
      if (!node) return new Node(data);
      if (node.data === data) return node;

      data < node.data
        ? (node.left = addNode(node.left, data))
        : (node.right = addNode(node.right, data));
      return node;
    }
  }

  has(data) {
    return searchNode(this.rootData, data);

    function searchNode(node, data) {
      if (!node) return false;
      if (node.data === data) return true;

      return data < node.data
        ? searchNode(node.left, data)
        : searchNode(node.right, data);
    }
  }

  find(data) {
    return searchNode(this.rootData, data);

    function searchNode(node, data) {
      if (!node) return null;
      if (node.data === data) return node;

      return data < node.data
        ? searchNode(node.left, data)
        : searchNode(node.right, data);
    }
  }

  remove(data) {
    this.rootData = removeNode(this.rootData, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRightNode = node.right;

        while (minRightNode.left) {
          minRightNode = minRightNode.left;
        }
        node.data = minRightNode.data;

        node.right = removeNode(node.right, minRightNode.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootData) return;

    let node = this.rootData;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.rootData) return;

    let node = this.rootData;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
