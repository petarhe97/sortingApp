/*
 * Simple Quick sort implementation that stores the sorting steps
 * Note: Redundant steps where the same element is being swapped are skipped using a set
*/

function swap(elements, firstIndex, secondIndex, steps) {
    let temp = elements[firstIndex];
    elements[firstIndex] = elements[secondIndex];
    elements[secondIndex] = temp;
    steps.add(elements.toString());
}

function partition(elements, left, right, steps) {
    let pivot = elements[Math.floor((left + right)/2)];
    let i = left;
    let j = right;

    while (i <= j) {
        while (elements[i] < pivot) {
            i++;
        }
        while (elements[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(elements, i, j, steps);
            i++;
            j--;
        }
    }

    return i;
}

function quicksort(elements, left, right, steps) {
    let index;

    if (elements.length > 1) {
        index = partition(elements, left, right, steps);

        if (left < index - 1) {
            quicksort(elements, left, index - 1, steps);
        }

        if (index < right) {
            quicksort(elements, index, right, steps);
        }
    }

    return elements;
}

function getSortingSteps(elements) {
    let resultSet = new Set();
    let original = elements.toString();
    quicksort(elements, 0, elements.length - 1, resultSet);

    let sortingSteps = Array.from(resultSet);
    sortingSteps.unshift(original);
    
    return sortingSteps;
}

exports.getSortingSteps = getSortingSteps