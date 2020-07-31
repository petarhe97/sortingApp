const con = require('./../db')
const quicksort = require('./../algorithms/quicksort')

// Adding a new step of sorting into the database
async function stepInsert(step, sequence, sequence_id) {
    con('sortingSteps')
        .insert({
            'step': step,
            'sequence': sequence,
            'sequence_id': sequence_id
        })
        .then(() => {
            console.log(`Step ${step}} inserted with sequence ${sequence} for id ${sequence_id}.`)
        })
        .catch(err => {
            console.log(`Error inserting step: ${err}`)
        })
}

// Inserts sequence into sequences table and gets the id of the row
function sequenceInsert(req,callback) {
    con('sequences')
        .insert({
            'sequence': req.body.sequence
        })
        .then(() => {
            console.log(`Sequence ${req.body.sequence} inserted.`)
        })
        .catch(err => {
            console.log(`Error inserting sequence: ${err}`)
        })

    con('sequences')
        .max('sequence_id as maxId')
        .first()
        .then(res => {
            console.log(res)
            callback(res.maxId)
        })
        .catch(err => {
            console.log(`Error getting id of inserted sequence ${err}`)
            callback(-1)
        })
}

// Async function that inserts sequence into the database and uses callback
// to pass sequence id to insert its sorting steps
async function insertIntoDatabase(req, sortingSteps) {
    sequenceInsert(req, function(id) {
        console.log(`sequence id is ${id}`)
        if (id == -1) {
            res.json({
                resultingSteps: ['Error inserting into database']
            })
            return;
        }
    
    
        let i;
        for(i = 0; i < sortingSteps.length; i++) {
            stepInsert(i, sortingSteps[i], id);
        }
    });
}

// Calls quick sort to sort the sequence, then calls to insert 
// sequence and steps into database
// returns the steps to caller
exports.sortSequence = async(req, res) => {
    let numeric = req.body.mode == 'Numeric' ? true : false;
    let passedValues = req.body.sequence.split(',');
    let sequence = numeric ? passedValues.map(Number) : passedValues;

    let sortingSteps = quicksort.getSortingSteps(sequence);
    console.log(sortingSteps);
    insertIntoDatabase(req, sortingSteps)


    res.json({
        resultingSteps: sortingSteps
    })
}