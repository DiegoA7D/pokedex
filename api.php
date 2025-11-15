<?php
header('Content-Type: application/json');
require 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client(['base_uri' => 'https://pokeapi.co/api/v2/']);

try {
    if (isset($_GET['action'])) {
        $action = $_GET['action'];

        if ($action === 'search' && isset($_GET['name'])) {
            $name = strtolower($_GET['name']);
            $response = $client->request('GET', "pokemon/$name");
            $data = json_decode($response->getBody(), true);
            
            echo json_encode([
                'success' => true,
                'data' => [
                    'id' => $data['id'],
                    'name' => ucfirst($data['name']),
                    'height' => $data['height'],
                    'weight' => $data['weight'],
                    'image' => $data['sprites']['other']['official-artwork']['front_default'] ?? $data['sprites']['front_default'],
                    'types' => array_map(function($t) { return $t['type']['name']; }, $data['types']),
                    'abilities' => array_map(function($a) { return $a['ability']['name']; }, $data['abilities']),
                    'stats' => array_map(function($s) { return ['name' => $s['stat']['name'], 'value' => $s['base_stat']]; }, $data['stats'])
                ]
            ]);
        } elseif ($action === 'list' && isset($_GET['offset'])) {
            $offset = intval($_GET['offset']);
            $response = $client->request('GET', 'pokemon', ['query' => ['limit' => 20, 'offset' => $offset]]);
            $data = json_decode($response->getBody(), true);
            
            $pokemons = [];
            foreach ($data['results'] as $pokemon) {
                $pokeResponse = $client->request('GET', "pokemon/" . basename($pokemon['url'], '/'));
                $pokeData = json_decode($pokeResponse->getBody(), true);
                $pokemons[] = [
                    'id' => $pokeData['id'],
                    'name' => ucfirst($pokeData['name']),
                    'image' => $pokeData['sprites']['other']['official-artwork']['front_default'] ?? $pokeData['sprites']['front_default'],
                    'types' => array_map(function($t) { return $t['type']['name']; }, $pokeData['types'])
                ];
            }
            
            echo json_encode([
                'success' => true,
                'data' => $pokemons,
                'next' => isset($data['next']),
                'previous' => isset($data['previous'])
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No action specified']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
