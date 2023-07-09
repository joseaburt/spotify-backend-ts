const mockUserRepository = {
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  deleteById: jest.fn(),
  findByEmail: jest.fn(),
};

export const clearMocks = () => {
  mockUserRepository.update.mockClear();
  mockUserRepository.create.mockClear();
  mockUserRepository.findById.mockClear();
  mockUserRepository.deleteById.mockClear();
  mockUserRepository.findByEmail.mockClear();
};

export default mockUserRepository;
