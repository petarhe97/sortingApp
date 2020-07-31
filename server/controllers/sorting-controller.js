const con = require('./../db')
const quicksort = require('./../algorithms/quicksort')

// Adding a new step of sorting into the database
exports.stepInsert = async (step, sequence, sequence_id) => {
    con('sortingSteps')
        .insert({
            'step': step,
            'sequence': sequence,
            'sequence_id': sequence_id
        })
        .then(() => {
            res.json({ message: 'Step inserted.'})
        })
        .catch(err => {
            res.json({ message: `Error inserting step: ${err}`})
        })
}

exports.sequenceInsert = async(req,res) => {
    con('sequences')
        .insert({
            'sequence': req.body.sequence
        })
        .then(() => {
            res.json({ mesage: 'Sequence inserted.'})
        })
        .catch(err => {
            res.json({ message: `Error inserting sequence: ${err}`})
        })
}

exports.sortSequence = async(req, res) => {
    let numeric = req.body.mode == 'Numeric' ? true : false;
    let passedValues = req.body.sequence.split(',');
    let sequence = numeric ? passedValues.map(Number) : passedValues;

    let sortingSteps = quicksort.getSortingSteps(sequence);
    console.log(sortingSteps);
    res.json({
        resultingSteps: sortingSteps
    })
}