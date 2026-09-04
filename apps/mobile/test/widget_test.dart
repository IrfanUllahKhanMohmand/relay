import 'package:flutter_test/flutter_test.dart';
import 'package:relay/main.dart';

void main() {
  testWidgets('shows scaffold home', (tester) async {
    await tester.pumpWidget(const RelayApp());

    expect(find.text('Relay'), findsOneWidget);
    expect(find.text('Lobby'), findsOneWidget);
  });
}
