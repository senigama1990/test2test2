// Клиент для обращения к API
const request = async (url, options) => {
  const response = await fetch(url, options);
  const payload = await response.json();
  if (!response.ok) {
    return { error: payload.error ?? 'Неизвестная ошибка' };
  }
  return payload;
};

export const fetchLanguages = () => request('/api/languages');

export const searchWord = (query, language) =>
  request(`/api/search?q=${encodeURIComponent(query)}&lang=${language}`);

export const fetchWord = (id) => request(`/api/word/${id}`);

export const fetchTree = (id, depth = 3) =>
  request(`/api/word/${id}/tree?depth=${depth}`);

export const compareWords = (ruId, uzId) =>
  request(`/api/compare?ru=${ruId}&uz=${uzId}`);

export const addWord = (payload) =>
  request('/api/admin/word', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

export const exportData = (language) =>
  request(`/api/admin/export?lang=${language}`);
