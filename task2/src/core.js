//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    return ~~n === n;}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    let mas = [];
    for (let x = 2; x < 21; x += 2) {
        mas.push(x);
    }
    return mas;}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let sum = 0;
    for (let x = 1; x <= n; ++x) {
        sum += x;
    }
    return sum;}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    if (!n) return 0;
    else return n + recSumTo(n - 1);}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    if (!n) return 1;
    if (n > 0) return n * factorial(n - 1);}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    let t = 0;
    while (n) {
        t += n & 1;
        n >>= 1;
    }
    return t === 1;}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    if (n <= 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    if (operatorFn === undefined) return () => initialValue;
    return function (val) {
        return (initialValue = operatorFn(initialValue, val));
    };}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
    return function () {
        const t = start;
        start += step;
        return t;
    };}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (typeof firstObject !== typeof secondObject) return false;
    const arr1 = Object.getOwnPropertyNames(firstObject);
    const arr2 = Object.getOwnPropertyNames(secondObject);
    if (arr1.length !== arr2.length) return false;
    if (arr1.length === 0) return Object.is(firstObject, secondObject);
    for (let i of arr1) {
        const template = i;
        const flag =
            typeof firstObject[template] === 'object' &&
            typeof secondObject[template] === 'object' &&
            firstObject[template] !== null;
        if (
            (!flag && firstObject[template] !== secondObject[template]) ||
            (flag && !deepEqual(firstObject[template], secondObject[template]))
        )
            return false;
    }
    return true;}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
