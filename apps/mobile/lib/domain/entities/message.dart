class Message {
  const Message({
    required this.id,
    required this.roomId,
    required this.authorId,
    required this.body,
    required this.createdAt,
  });

  final String id;
  final String roomId;
  final String authorId;
  final String body;
  final DateTime createdAt;
}
