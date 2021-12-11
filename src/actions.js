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

export function saveMemoryEdit(memory) {
  return dispatch => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memory),
    };
    fetch(`https://unforget-api.csblake.me:8443/memories/${memory.id}`, options)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          dispatch(replaceMemory({...memory, isEditing: false}));
        } else {
          console.error(data);
        }
      });
  };
}

export function newMemory(year, month, day) {
  const memory = {
    year,
    month,
    day,
    entry: '',
  };

  return dispatch => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memory),
    };
    fetch(`https://unforget-api.csblake.me:8443/memories`, options)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          dispatch(addMemory({
            ...memory,
            id: data.results,
            isEditing: true,
          }));
        }
      });
  };
}

export function deleteMemory(id) {
  return dispatch => {
    const options = {
      method: 'DELETE',
    };
    fetch(`https://unforget-api.csblake.me:8443/memories/${id}`, options)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          dispatch(removeMemory(id));
        }
      });
  };
}

export const Action = Object.freeze({
  ShowMemories: 'ShowMemories',
  StartMemoryEdit: 'StartMemoryEdit',
  CancelMemoryEdit: 'CancelMemoryEdit',
  ReplaceMemory: 'ReplaceMemory',
  AddMemory: 'AddMemory',
  RemoveMemory: 'RemoveMemory',
});

export function startMemoryEdit(id) {
  return {type: Action.StartMemoryEdit, payload: id};
}

export function cancelMemoryEdit(id) {
  return {type: Action.CancelMemoryEdit, payload: id};
}

export function addMemory(memory) {
  return {type: Action.AddMemory, payload: memory};
}

export function removeMemory(id) {
  return {type: Action.RemoveMemory, payload: id};
}

export function showMemories(memories) {
  return {type: Action.ShowMemories, payload: memories};
}

export function replaceMemory(memory) {
  return {type: Action.ReplaceMemory, payload: memory};
}