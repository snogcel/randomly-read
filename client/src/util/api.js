import { gql } from '@apollo/client';
import { useQuery } from "@apollo/react-hooks";

const baseUrl =
  process.env.NODE_ENV === 'development_'
    ? 'http://dev.snogcel.com:8080/api'
    : `https://api.stuttered.net/api`;

const methods = {
  get: async function (endpoint, token = null) {
    const options = {
      method: 'GET',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      }
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) {
      if (response.status === 401) throw Error(json.message);
      throw Error(json.message);
    }

    return json;
  },
  patch: async function (endpoint, body, token = null) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(body)
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) {
      if (response.status === 422) {
        json.errors.forEach(error => {
          throw Error(`${error.param} ${error.msg}`);
        });
      }

      if (response.status === 401) throw Error(json.message);
      throw Error(json.message);
    }

    return json;
  },
  post: async function (endpoint, body, token = null) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(body)
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) {
      if (response.status === 422) {
        json.errors.forEach(error => {
          throw Error(`${error.param} ${error.msg}`);
        });
      }

      if (response.status === 401) throw Error(json.message);
      throw Error(json.message);
    }

    return json;
  },

  delete: async function (endpoint, token = null) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) {
      if (response.status === 401) throw Error(json.message);
      throw Error(json.message);
    }

    return json;
  }
};

export async function login (username, password) {
  const json = await methods.post('login', { username, password });
  return json.token;
}

export async function signup (username, password, email, firstName, lastName, address, city, stateProvince, postalCode, country, gender, age) {
  const json = await methods.post('register', { username, password, email, firstName, lastName, address, city, stateProvince, postalCode, country, gender, age });
  return json.token;
}

export async function getPosts (category) {
  return await methods.get(`posts/${category}`);
}

export async function getPostsByDate (username, startDate, endDate) {
  return await methods.get(`user/${username}/start/${startDate}/end/${endDate}`);
}

export async function getProfile (username, category) {
  return await methods.get(`user/${username}/category/${category}`);
}

export async function getPost (id) {
  return await methods.get(`post/${id}`);
}

export async function createPost (body, token) {
  return await methods.post('posts', body, token);
}

export async function deletePost (id, token) {
  return await methods.delete(`post/${id}`, token);
}

export async function createComment (post, comment, token) {
  return await methods.post(`post/${post}`, comment, token);
}

export async function deleteComment (post, comment, token) {
  return await methods.delete(`post/${post}/${comment}`, token);
}

export async function castVote (id, vote, token) {
  const voteTypes = {
    '1': 'upvote',
    '0': 'unvote',
    '-1': 'downvote'
  };

  const voteType = voteTypes[vote];

  return await methods.get(`post/${id}/${voteType}`, token);
}

export async function createInteraction (body, token) {
  return await methods.post('interaction', body, token)
}

export async function deleteInteraction (id, token) {
  return await methods.delete(`interaction/${id}`, token);
}

export async function getInteractions (token) {
  return await methods.get('interaction', token)
}

export async function getInteractionSettings(token) {
  return await methods.get('settings/interactions', token);
}

export async function getRoutineSettings (token) {
  return await methods.get('settings/routines', token)
}

export async function getRoutines (token) {
  return await methods.get('settings/routines', token)
}

export async function updateRoutine (id, body, token) {
  return await methods.patch(`admin/routines/${id}`, body, token)
}

export async function getUsers (token) {
  return await methods.get('superuser/users', token)
}

export async function getUser (id, token) {
  return await methods.get(`superuser/users/${id}`, token)
}

export async function getUserRoutines (id, token) {
  return await methods.get(`superuser/routines/${id}`, token)
}

export async function createRoutine (userId, routineName, token) {
  return await methods.post('superuser/routines', { userId, routineName }, token);
}

export async function deleteRoutine (userId, routineId, token) {
  return await methods.delete(`superuser/routines/${userId}/${routineId}`, token);
}

export async function updateUser (id, body, token) {
  return await methods.patch(`superuser/users/${id}`, body, token)
}

export async function createUser (user, token) {
  return await methods.post('superuser/users', user, token);
}

export async function getViewHistory (id, startDate, endDate, token) {
  return await methods.get(`history/words/${id}/start/${startDate}/end/${endDate}`, token)
}

export function getGraphQL(query) {
  const { loading, data } = useQuery(query, {
    variables: { },
  });
  if (loading) return null;
  return data;
}

export function buildQuery(props) {

  let vowel = JSON.stringify(props.vowel);
  let consonant = JSON.stringify(props.consonant);
  let syllables = JSON.stringify(props.syllables);
  let limit = parseInt(props.limit);
  let position = JSON.stringify(props.position);
  let age = JSON.stringify(props.age);
  let mode = props.mode;

  switch(mode) {
    case 'Sentence':
      if (consonant.length > 0 && vowel.length > 0) {
        return gql`
                {
                    sentences(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          wordid
                          lexeme
                        }                       
                    }
                }
                `;
      } else if (consonant.length > 0 && !vowel.length > 0) {
        return gql`
                {
                    sentences(consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          wordid
                          lexeme
                        }                       
                    }
                }
                `;
      } else if (!consonant.length > 0 && vowel.length > 0) {
        return gql`
                {
                    sentences(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          wordid
                          lexeme
                        }                       
                    }
                }
                `;
      } else {
        return gql`
                {
                    sentences(syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          wordid
                          lexeme
                        }
                    }
                }
                `;
      }

    case 'Word':
      if (consonant.length > 0 && vowel.length > 0) {
        return gql`
                {
                    words(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        wordid
                        lexeme                        
                    }
                }
                `;
      } else if (consonant.length > 0 && !vowel.length > 0) {
        return gql`
                {
                    words(consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        wordid
                        lexeme                        
                    }
                }
                `;
      } else if (!consonant.length > 0 && vowel.length > 0) {
        return gql`
                {
                    words(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        wordid
                        lexeme                        
                    }
                }
                `;
      } else {
        return gql`
                {
                    words(syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        wordid
                        lexeme                        
                    }
                }
                `;
      }

    default:
      return null;
  }

}
