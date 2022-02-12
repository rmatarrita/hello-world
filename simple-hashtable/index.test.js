
const indexModule = require("./index");
const ListNode = indexModule.ListNode;
const sum = indexModule.sum;


test('constructor test', () => {
    expect(1+1).toBe(2)
  });

test('sum test', () => {
    expect(sum(3,4)).toBe(7);
});

test('constructor test', () => {
    const classInstance = new ListNode();
    expect(classInstance).toBeDefined();
  });
  