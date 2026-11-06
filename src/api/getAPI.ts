export interface UserInfo {
  username: string;
  user_id: number;
}
export interface ListUser {
  id: number;
  email: string;
  name: string;
  phone: null | string;
}

export interface DataUser {
  total_pages: number;
  total_elements: number;
  has_next: boolean;
  data: ListUser[];
}

export interface Devices {
  id: string;
  name: string;
  entity_profile: string;
  entity_type: string;
  children: Devices[];
  location: string;
  entity_level: number;
}

const baseUrl = "http://172.26.2.14/api";
const getAPI = async <T>(endpoint: string): Promise<T> => {
  const token = localStorage.getItem("token") || "";

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch data");
  }

  console.log(data);

  return data as T;
};

export const getCurrentUser = () => {
  return getAPI<UserInfo>("/auth/current-user");
};

export const getListUser = (page: number, name: string) => {
  return getAPI<DataUser>(
    `/user?${name && `text_search=${name}&`}page_size=12&page=${page - 1}`,
  );
};

export const getDetailUser = (id: number) => {
  return getAPI<ListUser>(`/user/info?id=${id}`);
};

export const getDevices = (name: string) => {
  return getAPI<Devices[]>(
    `/dashboard/tree/v2${name && `?text_search=${name}`}`,
  );
};
