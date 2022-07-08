//
// DTO Request messages
//

//
// DTO Request for Create
// 
export const CreateRequestMessage = (from, to, date, message) => {
    const request = {
        from: null,
        to: null,
        date: null,
        message: null
    }
    request.from = from;
    request.to = to;
    request.date = date;
    request.message = message;

    return request;
}

//
// DTO Request for Delete
// 
export const DeleteRequestMessage = (from, to) => {
    const request = {
        from: null,
        to: null
    }
    request.from = from;
    request.to = to;

    return request;
}
