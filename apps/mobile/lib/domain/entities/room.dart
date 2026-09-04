class Room {
  const Room({
    required this.id,
    required this.name,
    required this.hostId,
    required this.createdAt,
  });

  final String id;
  final String name;
  final String hostId;
  final DateTime createdAt;
}
