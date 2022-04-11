import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';
import { getCall } from '../../src/utils/service';

// ----------------------------------------------------------------------

// const users = [...Array(24)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avatarUrl: mockImgAvatar(index + 1),
//   name: faker.name.findName(),
//   company: faker.company.companyName(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   role: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager',
//     'Backend Developer',
//     'Full Stack Designer',
//     'Front End Developer',
//     'Full Stack Developer'
//   ])
// }));

export const getUsers = async () => {
  const response = await getCall('/dashboard/users');
  if(response && response.data) {
    return response?.data?.map((item, index) => ({
      id: item?.id,
      avatarUrl: mockImgAvatar(index + 1),
      name: item?.name,
      company: item?.company,
      isVerified: item?.verified,
      status: item?.status,
      role: item?.role,
    }));
  }
  return [];
}

// export default getUsers;
