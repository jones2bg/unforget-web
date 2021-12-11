function assertResponse(response) {
  if (response.status >= 200 || response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

export function fetchDay(month, day) {
  return dispatch => {
    fetch(`https://unforget-api.csblake.me:8443/memories/${month}/${day}`)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          dispatch(showMemories(data.results));
        } else {
          console.error(data);
        }
      });
  };
}

export const Action = Object.freeze({
  ShowMemories: 'ShowMemories',
  StartMemoryEdit: 'StartMemoryEdit',
  CancelMemoryEdit: 'CancelMemoryEdit',
});

export function startMemoryEdit(id) {
  return {type: Action.StartMemoryEdit, payload: id};
}

export function cancelMemoryEdit(id) {
  return {type: Action.CancelMemoryEdit, payload: id};
}

export function showMemories(memories) {
  return {type: Action.ShowMemories, payload: memories};
}