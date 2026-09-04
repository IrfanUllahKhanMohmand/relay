import 'package:flutter/material.dart';

import '../../domain/entities/room.dart';
import '../../domain/entities/user.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  static final _demoHost = User(
    id: 'user-scaffold',
    displayName: 'Scaffold',
    createdAt: DateTime.utc(2026, 9, 4),
  );

  static final _demoRoom = Room(
    id: 'room-lobby',
    name: 'Lobby',
    hostId: _demoHost.id,
    createdAt: DateTime.utc(2026, 9, 4),
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Relay')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Live rooms',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            const Text(
              'Join a room, chat, and see who is present. '
              'Auth and sockets come next.',
            ),
            const SizedBox(height: 24),
            ListTile(
              contentPadding: EdgeInsets.zero,
              title: Text(_demoRoom.name),
              subtitle: Text('Host: ${_demoHost.displayName}'),
            ),
          ],
        ),
      ),
    );
  }
}
